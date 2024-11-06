import {FormSectionProps, ImageView, TextField, useNotifyPopup} from "@fanam-pkg/core-ui-sass"
import {
  IFormData,
  JSONObject,
  REG_EMAIL,
  REG_VALID_NAME,
  REG_VALID_NUMBER,
  useReactQuery,
  useResize,
} from "@fanam-pkg/core-utils"
import {useRouter} from "next/navigation"
import {useEffect, useMemo, useState} from "react"
import {useMutation, useQueries, useQuery} from "@tanstack/react-query"
import {ButtonAccountType, useSlider} from "@custom/ui"
import {
  IBankInput,
  IPayloadRecipient,
  IRecipientData,
  IStyle,
  REG_INPUT_BSB,
  REG_INPUT_EMAIL,
  REG_INPUT_NAME,
  TypeAccount,
  TypeBankAccount,
} from "@custom/utils"
import assets from "assets"
import {useLocationController, useRecipientController} from "controller"
import {useCommon, useSingleton} from "hooks"
import {CountryFlag} from "organisms"
import {
  BANK_ACCOUNT_TYPE,
  ID_PROOFS,
  QUERY_CITIES,
  QUERY_COUNTRIES,
  QUERY_RECIPIENT,
  QUERY_STATES,
  ROUTE_RECIPIENT_PREVIEW,
} from "utils"

const useHandler = (styles: IStyle, recipientId?: string) => {
  const {push} = useRouter()
  const {isDesktop} = useResize()
  const {toggleSlider} = useSlider()
  const {isValidInputByRegex} = useCommon()
  const {refreshQuery} = useReactQuery()
  const {getTransactionCountries, getCities, getStates} = useLocationController()
  const {createRecipient, removeAttachment, updateRecipient, getByRecipientId} = useRecipientController()
  const {refetchTransaction, transId} = useSingleton()
  const {toggleNotify} = useNotifyPopup()

  const RECIPIENT_TYPE: IFormData<TypeAccount>[] = [
    {label: "Individual", key: "Individual"},
    {label: "Business", key: "Business"},
  ]

  const [data, setData] = useState<IRecipientData>({
    recipient_account_type: "Individual",
    first_name: "",
    last_name: "",
    account_no: "",
    bank_name: "",
    branch_address: "",
    branch_code: "",
    swift_code: "",
    address_line_1: "",
    address_line_2: "",
    email: "",
    phone_no: "",
    country: null,
    state: null,
    city: null,
    zip_code: "",
    id_issued_country: null,
    id_type: ID_PROOFS[0],
    id_number: "",
    kyc: [],
    account_type: "Current",
    business_name: "",
    bsb_code: "",
    iban_no: "",
    routing_code: "",
    is_send_email: {isSelected: false, label: "Send reconciliation report to your recipient’s Mail?"},
  })

  const {
    first_name,
    last_name,
    account_no,
    bank_name,
    address_line_1,
    address_line_2,
    email,
    phone_no,
    country,
    state,
    city,
    zip_code,
    id_issued_country,
    id_type,
    routing_code,
    iban_no,
    swift_code,
    branch_address,
    id_number,
    branch_code,
    kyc,
    recipient_account_type,
    account_type,
    business_name,
    bsb_code,
    is_send_email,
  } = data

  const [errData, setErrData] = useState(DEFAULT_ERR_STATE)

  const {isClicked} = errData
  const isIndividual = recipient_account_type === "Individual"

  const {
    errFirstName,
    errLastName,
    errAccountNo,
    errBankName,
    errBranchAddress,
    errBranchCode,
    errSwiftCode,
    errAddressLine1,
    errEmail,
    errPhoneNo,
    errCountry,
    errState,
    errCity,
    errZipCode,
    errIdIssuedCountry,
    errIdType,
    errIdNumber,
    errAccountType,
    errKyc,
    errBusinessName,
    errBsbCode,
    errIbanNo,
    errRoutingCode,
  } = errData

  const [{data: allCountries = []}, {data: allStates = []}, {data: allCities = []}] = useQueries({
    queries: [
      {queryKey: [QUERY_COUNTRIES], queryFn: getTransactionCountries},
      {
        queryKey: [`${QUERY_STATES}-${country?.key}`, country],
        queryFn: () => getStates(country?.key),
        enabled: !!country,
      },
      {
        queryKey: [`${QUERY_CITIES}-${state?.key}`, state],
        queryFn: () => getCities(state?.key),
        enabled: !!state,
      },
    ],
  })

  const {data: recipientData} = useQuery({
    queryKey: [QUERY_RECIPIENT.concat(recipientId)],
    queryFn: () => getByRecipientId(recipientId),
  })

  const {mutate: addRecipient} = useMutation({
    mutationKey: [QUERY_RECIPIENT],
    mutationFn: createRecipient,
    onSuccess: ({result, errorData}) => {
      if (result) {
        toggleNotify({type: "success", title: "Recipient created Successfully"})
        refreshQuery(QUERY_RECIPIENT.concat(recipient_account_type))
        push(ROUTE_RECIPIENT_PREVIEW)
        toggleSlider()
      } else toggleNotify({type: "error", title: errorData.message})
    },
  })

  const {mutate: onUpdate} = useMutation({
    mutationKey: [QUERY_RECIPIENT],
    mutationFn: updateRecipient,
    onSuccess: ({result, errorData}) => {
      refreshQuery(QUERY_RECIPIENT.concat(recipient_account_type))
      if (result) {
        refetchTransaction()
        toggleNotify({type: "success", title: "Recipient updated Successfully"})
        toggleSlider()
      } else toggleNotify({type: "error", title: errorData?.message})
    },
  })

  const {mutate: deleteFile} = useMutation({
    mutationKey: [QUERY_RECIPIENT],
    mutationFn: removeAttachment,
    onSuccess: ({result, errorData}, attachmentId) => {
      const {message} = errorData || {}
      const curData = {...data}
      curData.kyc = curData.kyc.filter(({attachment}) => attachment.id !== attachmentId)
      setData(curData)
      if (result) {
        toggleNotify({
          type: "success",
          title: "Removed attachment successfully",
        })
      } else {
        toggleNotify({
          type: "error",
          title: message || "Something went wrong",
        })
      }
    },
  })

  const countries: IFormData<number>[] = useMemo(
    () => allCountries.map(({country_id, country_name}) => ({label: country_name, key: country_id})),
    [allCountries]
  )

  const {getCountryCode, getNationalNumber} = useCommon()
  const [showCountry, setShowCountry] = useState(false)
  const selectedCountry = data.country ? allCountries?.find(country => country?.country_id === data.country.key) : null
  const nationalNumberLength = selectedCountry ? getNationalNumber(selectedCountry?.iso2)?.length : 0

  const onSelectCountry = selectedCountry => {
    setData(prev => ({
      ...prev,
      country: {
        key: selectedCountry.country_id,
        label: selectedCountry.country_name,
      },
      phone_no: "",
    }))
    setShowCountry(false)
  }

  const goToCountry = () => {
    setShowCountry(!showCountry)
  }

  useEffect(() => {
    if (allCountries?.length) {
      const initialCountry = allCountries.find(country => country.iso2 === "US")
      setData(prev => ({
        ...prev,
        country: initialCountry ? {key: initialCountry.country_id, label: initialCountry.country_name} : prev.country,
      }))
    }
  }, [allCountries])

  const {ibanInput, swiftInput, bsbInput, routingInput} = useMemo(() => {
    const verification: {
      ibanInput: null | IBankInput
      swiftInput: null | IBankInput
      routingInput: null | IBankInput
      bsbInput: null | IBankInput
    } = {ibanInput: null, swiftInput: null, routingInput: null, bsbInput: null}
    const {bankInputs = []} = allCountries.find(({country_id}) => country_id === country?.key) || {}

    verification.ibanInput = bankInputs.find(({type}) => type === "IBAN")
    verification.swiftInput = bankInputs.find(({type}) => type === "Swift")
    verification.bsbInput = bankInputs.find(({type}) => type === "BSB")
    verification.routingInput = bankInputs.find(({type}) => type === "Routing")
    return verification
  }, [country])

  const states: IFormData<number>[] = useMemo(
    () => allStates.map(({state_id, state_name}) => ({label: state_name, key: state_id})),
    [allStates]
  )

  const cities: IFormData<number>[] = useMemo(
    () => allCities.map(({city_id, city_name}) => ({label: city_name, key: city_id})),
    [allCities]
  )

  useEffect(() => {
    if (recipientData) {
      const {
        first_name,
        last_name,
        email,
        country,
        phone_no,
        address_line_1,
        address_line_2,
        state,
        city,
        zip_code,
        id_issued_country,
        id_type,
        id_number,
        bank_account,
        kyc_attachments,
        recipient_account_type,
        business_name,
        is_send_email,
      } = recipientData

      const {
        account_no,
        account_type,
        bank_name,
        branch_address,
        branch_code,
        swift_code,
        routing_code,
        iban_no,
        bsb_code,
      } = bank_account
      const {country_id, country_name} = country || {}
      const {country_id: idCountryId, country_name: idCountryName} = id_issued_country || {}
      const {state_id, state_name} = state || {}
      const {city_id, city_name} = city || {}

      setData({
        first_name,
        last_name,
        email,
        country: {label: country_name, key: country_id},
        phone_no,
        address_line_1,
        address_line_2,
        state: {label: state_name, key: state_id},
        city: {label: city_name, key: city_id},
        zip_code,
        id_issued_country: {label: idCountryName, key: idCountryId},
        account_no,
        bank_name,
        branch_address,
        branch_code,
        swift_code,
        routing_code,
        id_type: ID_PROOFS?.find(({key}) => key === id_type),
        id_number,
        iban_no,
        bsb_code,
        account_type: account_type as TypeBankAccount,
        kyc: kyc_attachments?.map(({url, attachment_id}) => ({
          attachment: {id: attachment_id, url},
          onClickRemove: deleteFile.bind(null, attachment_id),
        })),
        recipient_account_type,
        business_name,
        is_send_email: {isSelected: is_send_email, label: "Send reconciliation report to your recipient’s Mail?"},
      })
    }
  }, [recipientData])

  useEffect(() => {
    if (isClicked) setErrData(prev => ({...prev, ...onValidate()}))
  }, [data, isClicked])

  useEffect(() => {
    if (country) setData(prev => ({...prev, id_issued_country: country}))
  }, [country])

  const onChangeValue = (value: JSONObject) => {
    const phoneNO = (value?.phone_no as string) || ""
    const isValid = phoneNO === "" || isValidInputByRegex(phoneNO, REG_VALID_NUMBER)
    if (isValid && phoneNO.length <= nationalNumberLength) setData(prev => ({...prev, ...value}))
    // else toggleNotify({type: "error", title: "Only numbers are allowed"})
  }
  const onChangeCountry = (value: JSONObject) => onChangeValue({...value, state: null, city: null, phone_no: ""})

  const onChangeState = (value: JSONObject) => onChangeValue({...value, city: null})

  const onSelectAccType = (accountType: TypeAccount) => onChangeValue({recipient_account_type: accountType})

  const renderAccType = (item: IFormData<TypeAccount>, index: number) => (
    <ButtonAccountType
      key={index}
      content={item}
      onSelect={onSelectAccType}
      isSelected={item.key === recipient_account_type}
      selIcon={item.key === "Individual" ? assets.ic_select_personal : assets.ic_select_business}
      icon={item.key === "Individual" ? assets.ic_personal : assets.ic_business}
    />
  )

  const businessElements: FormSectionProps = {
    title: "Personal Information",
    wrapperClass: styles.recipient_address,
    wrapperClassGrid: styles.recipient_business_wrapper,
    childElements: [
      {
        elementType: "input",
        label: "Business Name",
        name: "business_name",
        error: errBusinessName,
        value: business_name,
        inputRegex: REG_VALID_NAME,
        onChangeValue,
      },
      {
        elementType: "input",
        label: "Contact Person First Name",
        name: "first_name",
        error: errFirstName,
        value: first_name,
        inputRegex: REG_INPUT_NAME,
        onChangeValue,
      },
      {
        elementType: "input",
        label: "Contact Person Last Name",
        name: "last_name",
        error: errLastName,
        value: last_name,
        inputRegex: REG_INPUT_NAME,
        onChangeValue,
      },
    ],
  }

  const personalElements: FormSectionProps = {
    title: "Personal Information",
    wrapperClass: styles.recipient_address,
    wrapperClassGrid: styles.recipient_address_wrapper,
    childElements: [
      {
        elementType: "input",
        label: "First Name",
        name: "first_name",
        error: errFirstName,
        value: first_name,
        inputRegex: REG_INPUT_NAME,
        onChangeValue,
      },
      {
        elementType: "input",
        label: "Last Name",
        name: "last_name",
        error: errLastName,
        value: last_name,
        inputRegex: REG_INPUT_NAME,
        onChangeValue,
      },
    ],
  }

  const bankElements: FormSectionProps = {
    title: "Bank Details",
    wrapperClassGrid: styles.bank_details,
    childElements: [
      {
        elementType: "drop-down",
        label: "Account Type",
        name: "account_type",
        error: errAccountType,
        value: account_type,
        options: BANK_ACCOUNT_TYPE,
        onChangeValue,
      },
      {
        elementType: "input",
        label: "Account Number",
        name: "account_no",
        error: errAccountNo,
        value: account_no,
        inputRegex: REG_VALID_NUMBER,
        onChangeValue,
      },
      {
        elementType: "input",
        label: "Bank Name",
        name: "bank_name",
        error: errBankName,
        value: bank_name,
        onChangeValue,
      },
      {
        elementType: "input",
        label: "Branch Code",
        name: "branch_code",
        error: errBranchCode,
        value: branch_code,
        inputRegex: REG_VALID_NAME,
        onChangeValue,
      },
      {
        elementType: "input",
        label: "Branch Address ",
        name: "branch_address",
        error: errBranchAddress,
        value: branch_address,
        onChangeValue,
      },
    ],
  }

  if (swiftInput) {
    bankElements.childElements.push({
      elementType: "input",
      label: "Swift Code",
      name: "swift_code",
      error: errSwiftCode,
      value: swift_code,
      inputRegex: REG_VALID_NAME,
      onChangeValue,
    })
  }

  if (ibanInput) {
    bankElements.childElements.push({
      elementType: "input",
      label: "IBAN Code",
      name: "iban_no",
      value: iban_no,
      error: errIbanNo,
      inputRegex: REG_VALID_NAME,
      onChangeValue,
    })
  }

  if (routingInput) {
    bankElements.childElements.push({
      elementType: "input",
      label: "Routing Code",
      name: "routing_code",
      value: routing_code,
      error: errRoutingCode,
      inputRegex: REG_VALID_NAME,
      onChangeValue,
    })
  }

  if (bsbInput) {
    bankElements.childElements.push({
      elementType: "input",
      label: "BSB Code",
      name: "bsb_code",
      value: bsb_code,
      error: errBsbCode,
      inputRegex: REG_INPUT_BSB,
      onChangeValue,
    })
  }
  const formElements: FormSectionProps[] = [
    {
      title: "Recipient type",
      wrapperClassGrid: styles.recipient_type_wrapper,
      children: <ul className={`${styles.btn_container}`}>{RECIPIENT_TYPE?.map(renderAccType)}</ul>,
    },
    isIndividual ? personalElements : businessElements,
    {
      wrapperClassGrid: styles.personal,
      childElements: [
        {
          elementType: "input",
          label: "Email",
          name: "email",
          inputRegex: REG_INPUT_EMAIL,
          error: errEmail,
          value: email,
          onChangeValue,
        },
        {
          childElement: (
            <>
              <section className={`flex-start ${styles.input_wrapper}`}>
                <section className={`flex ${styles.country_wrapper} ${errPhoneNo ? styles.error_border : ""}`}>
                  <CountryFlag countryCode={getCountryCode(selectedCountry)} wrapperClass={styles.flag} />
                  <h5 className={styles.country_code}>{selectedCountry ? `+${selectedCountry.phone_code}` : "-"}</h5>
                  <ImageView
                    src={assets.ic_down_arrow_theme}
                    alt="down-arrow"
                    imgSize={24}
                    onClick={goToCountry}
                    wrapperClass={styles.country_arrow}
                  />
                  <TextField
                    label="Phone Number"
                    name="phone_no"
                    value={phone_no}
                    onChangeData={onChangeValue}
                    wrapperClass={styles.phone_number}
                    autoComplete="off"
                    inputRegex={REG_VALID_NUMBER}
                  />
                </section>
              </section>
              {errPhoneNo && <p className={styles.error_message}>{errPhoneNo}</p>}
            </>
          ),
        },
      ],
    },
    {
      wrapperClassGrid: styles.border_wrapper,
      childElements: [
        {
          elementType: "checkbox",
          name: "is_send_email",
          value: is_send_email,
          option: is_send_email,
          wrapperClass: styles.checkbox_container,
          onChangeValue,
          childBottom: (
            <p className={styles.recon_wrapper}>
              Reconciliation report includes all the details of the sender , the invoice, transaction details and the
              purpose of sending money . It is sent to the recipient email id given above to help them clear the
              invoices against the right sender.
            </p>
          ),
        },
      ],
    },
    {
      title: "Address",
      wrapperClassGrid: styles.address_details,
      childElements: [
        {
          elementType: "input",
          label: "Address Line 1",
          name: "address_line_1",
          error: errAddressLine1,
          value: address_line_1,
          maxLength: 75,
          onChangeValue,
        },
        {
          elementType: "input",
          label: "Address Line 2 (Optional)",
          name: "address_line_2",
          value: address_line_2,
          isRequired: false,
          maxLength: 75,
          onChangeValue,
        },
      ],
    },
    {
      wrapperClassGrid: styles.address_details,
      childElements: [
        {
          elementType: "drop-down",
          label: "Country",
          name: "country",
          options: countries,
          error: errCountry,
          value: country,
          onChangeValue: onChangeCountry,
        },
        {
          elementType: "drop-down",
          label: "State",
          name: "state",
          disabled: !country,
          options: states,
          error: errState,
          value: state,
          onChangeValue: onChangeState,
        },
        {
          elementType: "drop-down",
          label: "City",
          name: "city",
          disabled: !state,
          options: cities,
          error: errCity,
          value: city,
          onChangeValue,
        },
        {
          elementType: "input",
          label: "Pin Code",
          name: "zip_code",
          error: errZipCode,
          inputRegex: REG_VALID_NUMBER,
          value: zip_code,
          onChangeValue,
        },
      ],
    },
    bankElements,
    {
      title: "Identification",
      wrapperClassGrid: styles.id_types,
      childElements: [
        {
          elementType: "drop-down",
          label: "Select ID Issued Country",
          name: "id_issued_country",
          options: countries,
          error: errIdIssuedCountry,
          value: id_issued_country,
          onChangeValue,
        },
        {
          elementType: "drop-down",
          label: "Select ID Type",
          options: ID_PROOFS,
          name: "id_type",
          error: errIdType,
          value: id_type,
          onChangeValue,
        },
        {
          elementType: "input",
          label: "ID Number",
          name: "id_number",
          error: errIdNumber,
          value: id_number,
          onChangeValue,
        },
      ],
    },
    {
      wrapperClassGrid: styles.img_picker,
      childElements: [
        {
          elementType: "file-picker",
          fileType: ["image/*", "application/pdf"],
          name: "kyc",
          isMultiple: true,
          wrapperClass: `flex-col ${styles.upload_img_picker}`,
          children: <CustomUpload />,
          label: "Identity Proof",
          value: kyc,
          error: errKyc,
          maxCount: 2,
          onChangeValue,
        },
      ],
    },
  ]

  const onValidate = () => {
    let errState = {...DEFAULT_ERR_STATE, isValid: true, isClicked: true}

    if (!first_name) {
      errState = {
        ...errState,
        errFirstName: "Please enter First Name",
        isValid: false,
      }
    } else if (first_name.length < 2) {
      errState = {
        ...errState,
        errFirstName: "FirstName must be longer than or equal to 2 characters",
        isValid: false,
      }
    }
    if (!last_name) errState = {...errState, errLastName: "Please enter Last Name", isValid: false}

    if (!account_no) {
      errState = {
        ...errState,
        errAccountNo: "Please enter Account number",
        isValid: false,
      }
    } else if (account_no.length < 5) {
      errState = {
        ...errState,
        errAccountNo: "Account number must be longer than or equal to 5 characters",
        isValid: false,
      }
    }

    if (!bank_name) {
      errState = {
        ...errState,
        errBankName: "Please enter Bank name",
        isValid: false,
      }
    } else if (bank_name.length < 2) {
      errState = {
        ...errState,
        errBankName: "Bank name must be longer than or equal to 2 characters",
        isValid: false,
      }
    }

    if (!branch_code) {
      errState = {
        ...errState,
        errBranchCode: "Please enter Branch code",
        isValid: false,
      }
    } else if (branch_code.length < 2) {
      errState = {
        ...errState,
        errBranchCode: "Branch code must be longer than or equal to 2 characters",
        isValid: false,
      }
    }

    if (!branch_address) {
      errState = {
        ...errState,
        errBranchAddress: "Please enter Branch address",
        isValid: false,
      }
    } else if (branch_address.length < 5) {
      errState = {
        ...errState,
        errBranchAddress: "Branch address must be longer than or equal to 5 characters",
        isValid: false,
      }
    }

    if (swiftInput && !isValidInputByRegex(swift_code, swiftInput.regEx))
      errState = {...errState, errSwiftCode: "Please enter Swift code", isValid: false}

    if (routingInput && !isValidInputByRegex(routing_code, routingInput.regEx))
      errState = {...errState, errRoutingCode: "Please enter valid Routing code", isValid: false}

    if (ibanInput && !isValidInputByRegex(iban_no, ibanInput.regEx))
      errState = {...errState, errIbanNo: "Please enter valid IBAN code", isValid: false}

    if (bsbInput && !isValidInputByRegex(bsb_code, bsbInput.regEx))
      errState = {...errState, errBsbCode: "Please enter valid BSB code", isValid: false}

    if (!address_line_1) errState = {...errState, errAddressLine1: "Please enter Address", isValid: false}

    if (!country) {
      errState = {
        ...errState,
        errPhoneNo: "Please select country",
        isValid: false,
      }
    } else if (!phone_no || phone_no.length !== nationalNumberLength) {
      errState = {
        ...errState,
        errPhoneNo: `Please enter a valid phone number with ${nationalNumberLength} digits`,
        isValid: false,
      }
    }
    if (!isValidInputByRegex(email, REG_EMAIL))
      errState = {...errState, errEmail: "Please enter Email", isValid: false}

    if (!state) errState = {...errState, errState: "Please select State", isValid: false}

    if (!city) errState = {...errState, errCity: "Please select City/District", isValid: false}

    if (!zip_code) errState = {...errState, errZipCode: "Please enter Pin code", isValid: false}

    if (!id_issued_country)
      errState = {...errState, errIdIssuedCountry: "Please select ID issued country", isValid: false}

    if (!id_type) errState = {...errState, errIdType: "Please select ID type", isValid: false}

    if (!id_number) {
      errState = {
        ...errState,
        errIdNumber: "Please enter ID number",
        isValid: false,
      }
    } else if (id_number.length < 4) {
      errState = {
        ...errState,
        errIdNumber: "ID number must be longer than or equal to 4 characters",
        isValid: false,
      }
    }
    if (!account_type) errState = {...errState, errAccountType: "Please choose recipient account type", isValid: false}

    if (!isIndividual && !business_name)
      errState = {...errState, errBusinessName: "Please enter business name", isValid: false}

    if (!kyc || kyc.length === 0) {
      errState = {
        ...errState,
        errKyc: "Please upload an identity proof",
        isValid: false,
      }
    }

    setErrData(errState)
    return errState
  }

  const onSubmit = () => {
    const {isValid} = onValidate()
    if (isValid) {
      const payload: IPayloadRecipient = {
        first_name,
        last_name,
        address_line_1,
        address_line_2,
        email,
        phone_no,
        zip_code,
        id_number,
        recipient_account_type,
        business_name,
        country_id: country.key,
        state_id: state.key,
        city_id: city.key,
        id_issued_country_id: id_issued_country.key,
        id_type: id_type?.key,
        kyc: kyc.filter(({file}) => !!file),
        is_send_email: is_send_email.isSelected,
        bank_account: {
          branch_address,
          account_no,
          swift_code,
          iban_no,
          routing_code,
          bank_name,
          branch_code,
          account_type,
          bsb_code,
        },
      }

      if (isIndividual) delete payload.business_name

      if (!bsbInput) delete payload.bank_account.bsb_code

      if (!swiftInput) delete payload.bank_account.swift_code

      if (!routingInput) delete payload.bank_account.routing_code

      if (!ibanInput) delete payload.bank_account.iban_no

      if (!address_line_2) delete payload.address_line_2

      if (recipientId) onUpdate({...payload, recipient_id: recipientId, transaction_id: transId})
      else addRecipient(payload)
    }
  }

  return {
    onChangeValue,
    onSubmit,
    createRecipient,
    formElements,
    isDesktop,
    toggleSlider,
    deleteFile,
    showCountry,
    onSelectCountry,
    data,
    allCountries,
    selectedCountry,
    setShowCountry,
  }
}

export default useHandler

export const CustomUpload = (styles: IStyle) => (
  <section className={`flex ${styles.upload_container}`}>
    <ImageView src={assets.ic_cloudUpload} alt={"upload"} imgSize={24} />
    <h5 className={styles.text_wrapper}>Upload Front Side of the Document</h5>
  </section>
)

const DEFAULT_ERR_STATE = {
  isClicked: false,
  isValid: false,
  errFirstName: "",
  errLastName: "",
  errAccountNo: "",
  errBankName: "",
  errBranchAddress: "",
  errBranchCode: "",
  errSwiftCode: "",
  errIbanNo: "",
  errBsbCode: "",
  errRoutingCode: "",
  errAddressLine1: "",
  errEmail: "",
  errPhoneNo: "",
  errCountry: "",
  errState: "",
  errCity: "",
  errZipCode: "",
  errIdIssuedCountry: "",
  errIdType: "",
  errIdNumber: "",
  errAccountType: "",
  errKyc: "",
  errBusinessName: "",
}

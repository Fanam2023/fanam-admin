import {FormSectionProps, ImageView, useNotifyPopup} from "@fanam-pkg/core-ui-sass"
import {IFormData, JSONObject, REG_EMAIL, useCommon, useReactQuery, useResize} from "@fanam-pkg/core-utils"
import {useRouter} from "next/navigation"
import {useEffect, useMemo, useState} from "react"
import {useMutation, useQueries} from "@tanstack/react-query"
import {useSlider} from "@custom/ui"
import {IPayloadRecipient, IRecipientData, IStyle} from "@custom/utils"
import assets from "assets"
import {useLocationController, useRecipientController} from "controller"
import {useSingleton} from "hooks"
import {ID_PROOFS, QUERY_CITIES, QUERY_COUNTRIES, QUERY_RECIPIENT, QUERY_STATES, ROUTE_RECIPIENT_PREVIEW} from "utils"

const useHandler = (styles: IStyle, recipientId?: string) => {
  const {push} = useRouter()
  const {isDesktop} = useResize()
  const {toggleSlider} = useSlider()
  const {isValidInputByRegex} = useCommon()
  const {refreshQuery} = useReactQuery()
  const {getAllCountries, getCities, getStates} = useLocationController()
  const {createRecipient, updateRecipient, getByRecipientId} = useRecipientController()
  const {transId: transaction_id, transData} = useSingleton()
  const {toggleNotify} = useNotifyPopup()

  const [data, setData] = useState<IRecipientData>({
    first_name: "",
    last_name: "",
    account_no: "",
    bank_name: "",
    branch_address: "",
    branch_code: "",
    swift_code: "",
    address: "",
    email: "",
    phone_no: "",
    country: null,
    state: null,
    city: null,
    zip_code: "",
    id_issued_country: null,
    id_type: "",
    id_number: "",
    kyc: [],
  })

  const {
    first_name,
    last_name,
    account_no,
    bank_name,
    address,
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
  } = data

  const [errData, setErrData] = useState(DEFAULT_ERR_STATE)

  const {isClicked} = errData

  const onValidate = () => {
    let errState = {...DEFAULT_ERR_STATE, isValid: true, isClicked: true}

    if (!first_name) errState = {...errState, errFirstName: "Please enter FirstName", isValid: false}

    if (!last_name || last_name.length < 2)
      errState = {...errState, errLastName: "LastName must be longer than 2 characters", isValid: false}

    if (!account_no) errState = {...errState, errAccountNo: "Please enter AccountNumber", isValid: false}

    if (!bank_name) errState = {...errState, errBankName: "Please enter BankName", isValid: false}

    if (!branch_code) errState = {...errState, errBranchCode: "Please enter Branch code", isValid: false}

    if (!branch_address) errState = {...errState, errBranchAddress: "Please enter Branch address", isValid: false}

    if (!swift_code) errState = {...errState, errSwiftCode: "Please enter Swift code", isValid: false}

    if (!address) errState = {...errState, errAddress: "Please enter Address", isValid: false}

    if (!country) errState = {...errState, errCountry: "Please select Country", isValid: false}

    if (!phone_no) errState = {...errState, errPhoneNo: "Please enter PhoneNumber", isValid: false}

    if (!isValidInputByRegex(email, REG_EMAIL))
      errState = {...errState, errEmail: "Please enter E-mail ID", isValid: false}

    if (!state) errState = {...errState, errState: "Please select State", isValid: false}

    if (!city) errState = {...errState, errCity: "Please select City", isValid: false}

    if (!zip_code) errState = {...errState, errZipCode: "Please enter PinCode", isValid: false}

    if (!id_issued_country)
      errState = {...errState, errIdIssuedCountry: "Please Select ID issued Country", isValid: false}

    if (!id_type) errState = {...errState, errIdType: "Please Select ID type", isValid: false}

    if (!id_number) errState = {...errState, errIdNumber: "Please enter ID number", isValid: false}

    setErrData(errState)
    return errState
  }

  const onRecipientPreview = () => push(ROUTE_RECIPIENT_PREVIEW)

  const {
    errFirstName,
    errLastName,
    errAccountNo,
    errBankName,
    errBranchAddress,
    errBranchCode,
    errSwiftCode,
    errAddress,
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
  } = errData

  const [{data: allCountries = []}, {data: allStates = []}, {data: allCities = []}, {data: recipientData}] = useQueries(
    {
      queries: [
        {queryKey: [QUERY_COUNTRIES], queryFn: getAllCountries},
        {
          queryKey: [`${QUERY_STATES}-${country?.key}`, country],
          queryFn: () => getStates(country?.key as string),
          enabled: !!country,
        },
        {
          queryKey: [`${QUERY_CITIES}-${state?.key}`, state],
          queryFn: () => getCities(state?.key as string),
          enabled: !!state,
        },
        {
          queryKey: [`${QUERY_RECIPIENT}-${recipientId}`, state],
          queryFn: () => getByRecipientId(recipientId),
          enabled: !!recipientId,
        },
      ],
    }
  )

  function onSuccess(message: string) {
    toggleNotify({
      type: "success",
      title: message,
      description: "Recipient added Successfully.",
    })
  }

  function onFailure(message: string) {
    toggleNotify({
      type: "error",
      title: message,
    })
  }

  const {mutate: addRecipient, data: addedRes} = useMutation({
    mutationKey: [QUERY_RECIPIENT],
    mutationFn: createRecipient,
    onSuccess: ({result, errorData}) => {
      refreshQuery(QUERY_RECIPIENT)
      if (result) onSuccess("Recipient Successfully updated")
      else onFailure(errorData.message)
    },
  })

  const {mutate: onUpdate, data: updatedRes} = useMutation({
    mutationKey: [QUERY_RECIPIENT],
    mutationFn: updateRecipient,
    onSuccess: ({result, errorData}) => {
      refreshQuery(QUERY_RECIPIENT)
      if (result) onSuccess("Recipient Successfully Created")
      else onFailure(errorData.message)
    },
  })

  const countries: IFormData[] = useMemo(
    () => allCountries.map(({country_id, country_name}) => ({label: country_name, key: country_id})),
    [allCountries]
  )

  const states: IFormData[] = useMemo(
    () => allStates.map(({state_id, state_name}) => ({label: state_name, key: state_id})),
    [allStates]
  )

  const cities: IFormData[] = useMemo(
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
        address,
        state,
        city,
        zip_code,
        id_issued_country,
        id_type,
        id_number,
        bank_account,
        kyc_attachments,
      } = recipientData

      const {account_no, account_type, bank_name, branch_address, branch_code, swift_code, routing_code, iban_no} =
        bank_account
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
        address,
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
        id_type,
        id_number,
        iban_no,
        kyc: kyc_attachments?.map(({url, attachment_id}) => ({attachment: {id: attachment_id, url}})),
      })
    }
  }, [recipientData])

  useEffect(() => {
    if (isClicked) setErrData(prev => ({...prev, ...onValidate()}))
  }, [data, isClicked])

  const onChangeValue = (value: JSONObject) => setData(prev => ({...prev, ...value}))

  const onChangeCountry = (value: JSONObject) => onChangeValue({...value, state: null, city: null})

  const onChangeState = (value: JSONObject) => onChangeValue({...value, city: null})

  const formElements: FormSectionProps[] = [
    {
      title: "Personal Information",
      wrapperClassGrid: styles.personal_details,
      childElements: [
        {
          elementType: "input",
          label: "Enter FirstName",
          name: "first_name",
          error: errFirstName,
          value: first_name,
          onChangeValue,
        },
        {
          elementType: "input",
          label: "Enter LastName",
          name: "last_name",
          error: errLastName,
          value: last_name,
          onChangeValue,
        },
      ],
    },
    {
      wrapperClassGrid: styles.personal,
      childElements: [
        {
          elementType: "input",
          label: "Enter PhoneNumber",
          name: "phone_no",
          error: errPhoneNo,
          value: phone_no,
          onChangeValue,
          maxLength: 10,
        },
        {
          elementType: "input",
          label: "Enter Email",
          name: "email",
          error: errEmail,
          value: email,
          onChangeValue,
        },
      ],
    },
    {
      title: "Address",
      wrapperClassGrid: styles.address,
      childElements: [
        {
          elementType: "input",
          label: "Home address",
          name: "address",
          error: errAddress,
          value: address,
          onChangeValue,
        },
      ],
    },
    {
      wrapperClassGrid: styles.address_details,
      childElements: [
        {
          elementType: "drop-down",
          label: "Enter country",
          name: "country",
          options: countries,
          error: errCountry,
          value: country,
          onChangeValue: onChangeCountry,
        },
        {
          elementType: "drop-down",
          label: "Enter State",
          name: "state",
          disabled: !country,
          options: states,
          error: errState,
          value: state,
          onChangeValue: onChangeState,
        },
        {
          elementType: "drop-down",
          label: "Enter City",
          name: "city",
          disabled: !state,
          options: cities,
          error: errCity,
          value: city,
          onChangeValue,
        },
        {
          elementType: "input",
          label: "Enter ZipCode",
          name: "zip_code",
          error: errZipCode,
          value: zip_code,
          onChangeValue,
        },
      ],
    },
    {
      title: "Bank Details",
      wrapperClassGrid: styles.bank_details,
      childElements: [
        {
          elementType: "input",
          label: "Enter Account Number",
          name: "account_no",
          error: errAccountNo,
          value: account_no,
          onChangeValue,
        },
        {
          elementType: "input",
          label: "Enter BankName",
          name: "bank_name",
          error: errBankName,
          value: bank_name,
          onChangeValue,
        },
        {
          elementType: "input",
          label: "Enter Branch code",
          name: "branch_code",
          error: errBranchCode,
          value: branch_code,
          onChangeValue,
        },
        {
          elementType: "input",
          label: "Enter Branch Address ",
          name: "branch_address",
          error: errBranchAddress,
          value: branch_address,
          onChangeValue,
        },
        {
          elementType: "input",
          label: "Enter bic",
          name: "swift_code",
          error: errSwiftCode,
          value: swift_code,
          onChangeValue,
        },
        {
          elementType: "input",
          label: "Enter Routing code (optional)",
          name: "routing_code",
          value: routing_code,
          onChangeValue,
        },
        {
          elementType: "input",
          label: "Enter iban no (optional)",
          name: "iban_no",
          value: iban_no,
          onChangeValue,
        },
      ],
    },
    {
      title: "Identification",
      wrapperClassGrid: styles.id_types,
      childElements: [
        {
          elementType: "drop-down",
          label: "Select ID issued country",
          name: "id_issued_country",
          options: countries,
          error: errIdIssuedCountry,
          value: id_issued_country,
          onChangeValue,
        },
        {
          elementType: "drop-down",
          label: "Select ID type",
          options: ID_PROOFS,
          name: "id_type",
          error: errIdType,
          value: id_type,
          onChangeValue,
        },
        {
          elementType: "input",
          label: "Enter ID number",
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
          children: <CustomUpload />,
          value: kyc,
          error: errKyc,
          onChangeValue,
        },
      ],
    },
  ]

  useEffect(() => {
    if (addedRes) {
      toggleSlider()
      onRecipientPreview()
    } else if (updatedRes) {
      toggleSlider()
    }
  }, [addedRes, updatedRes])

  const onSubmit = () => {
    const {isValid} = onValidate()

    if (isValid) {
      const payLoad: IPayloadRecipient = {
        first_name,
        last_name,
        address,
        email,
        phone_no,
        country_id: country.key as number,
        state_id: state.key as number,
        city_id: city.key as number,
        zip_code,
        id_issued_country_id: id_issued_country.key as number,
        id_number,
        id_type,
        transaction_id,
        kyc: kyc.filter(({file}) => !!file),
        bank_account: {
          branch_address,
          account_no,
          swift_code,
          iban_no,
          routing_code,
          bank_name,
          branch_code,
          account_type: transData.recipient_account_type,
        },
      }

      if (recipientId) onUpdate({...payLoad, recipient_id: recipientId})
      else addRecipient(payLoad)
    }
  }

  return {
    onChangeValue,
    onSubmit,
    formElements,
    isDesktop,
    toggleSlider,
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
  errAddress: "",
  errEmail: "",
  errPhoneNo: "",
  errCountry: "",
  errState: "",
  errCity: "",
  errZipCode: "",
  errIdIssuedCountry: "",
  errIdType: "",
  errIdNumber: "",
  errAccountPurpose: "",
  errAccountType: "",
  errKyc: "",
}

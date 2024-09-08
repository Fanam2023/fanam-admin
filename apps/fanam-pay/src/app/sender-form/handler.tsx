import {Button, FormSectionProps, ImageView, TextField, useNotifyPopup, usePopup} from "@fanam-pkg/core-ui-sass"
import {IFormData, JSONObject, REG_EMAIL, useCommon} from "@fanam-pkg/core-utils"
import {useRouter} from "next/navigation"
import {useEffect, useMemo, useState} from "react"
import {useMutation, useQueries} from "@tanstack/react-query"
import {IStyle, ISyncUserData} from "@custom/utils"
import assets from "assets"
import {useAuthController, useLocationController, useVerificationController} from "controller"
import {useSingleton} from "hooks"
import {OtpPopUp} from "organisms"
import {
  ACCOUNT_TYPE,
  BUSINESS_TYPE,
  ID_PROOFS,
  QUERY_CITIES,
  QUERY_COUNTRIES,
  QUERY_PAN_CARD,
  QUERY_STATES,
  QUERY_USER,
  ROUTE_INITIATE_TRANSACTION,
} from "utils"

const DEFAULT_ERR_STATE = {
  isClicked: false,
  isValid: false,
  errFirstName: "",
  errLastName: "",
  errEmail: "",
  errPhoneNo: "",
  errAccountNo: "",
  errAccountType: "",
  errCountry: "",
  errState: "",
  errAddress: "",
  errCity: "",
  errZipCode: "",
  errIdIssuedCountry: "",
  errIdType: "",
  errKyc: "",
  errBusinessName: "",
  errPan: "",
  errAadhaarNumber: "",
  errBusinessType: "",
}

const useHandler = (styles: IStyle) => {
  const {push} = useRouter()
  const {isValidInputByRegex} = useCommon()
  const {getAllCountries, getCities, getStates} = useLocationController()
  const {syncUser} = useAuthController()
  const {verifyPanCard} = useVerificationController()
  const {toggleNotify} = useNotifyPopup()
  const {togglePopup} = usePopup()
  const {updateUserData, user} = useSingleton()
  const [data, setData] = useState<ISyncUserData>({
    first_name: "",
    last_name: "",
    email: "",
    phone_no: "",
    address_line_1: "",
    address_line_2: "",
    country: null,
    state: null,
    zip_code: "",
    city: null,
    account_no: "",
    id_type: "",
    id_issued_country: null,
    id_number: "",
    account_type: "",
    pan: "",
    aadhaarNumber: "",
    business_name: "",
    business_type: "Sole_proprietor",
    kyc: [],
  })
  const [errData, setErrData] = useState(DEFAULT_ERR_STATE)

  const {
    first_name,
    last_name,
    email,
    account_no,
    phone_no,
    country,
    state,
    address_line_1,
    address_line_2,
    city,
    account_type,
    zip_code,
    id_type,
    id_issued_country,
    id_number,
    kyc,
    pan,
    aadhaarNumber,
    business_name,
    business_type,
  } = data

  const {
    isClicked,
    errFirstName,
    errLastName,
    errEmail,
    errPhoneNo,
    errAccountNo,
    errAccountType,
    errIdType,
    errIdIssuedCountry,
    errCountry,
    errState,
    errAddress,
    errCity,
    errZipCode,
    errKyc,
    errBusinessName,
    errBusinessType,
  } = errData

  const toggle = () => {
    togglePopup({
      title: "Verify Aadhaar",
      children: <OtpPopUp></OtpPopUp>,
      // isClosable: false,
    })
  }

  const [{data: allCountries = []}, {data: allStates = []}, {data: allCities = []}] = useQueries({
    queries: [
      {queryKey: [QUERY_COUNTRIES], queryFn: getAllCountries},
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

  const {mutate: updateUser, data: userRes} = useMutation({mutationKey: [QUERY_USER], mutationFn: syncUser})

  const {mutate: verifyPan, data: panRes} = useMutation({
    mutationKey: [QUERY_PAN_CARD],
    mutationFn: verifyPanCard,
    onSuccess: ({result, errorData}) => {
      const {message} = errorData || {}
      if (result)
        toggleNotify({
          title: "Success",
          description: "PAN card verified successfully!",
          type: "success",
        })
      else
        toggleNotify({
          title: "Error - PAN Verification",
          description: message || "PAN verification failed. Please try again.",
          type: "error",
        })
    },
  })

  const {result} = panRes || {}
  const {verification, message} = result?.result || {}

  const countries: IFormData<number>[] = useMemo(
    () => allCountries.map(({country_id, country_name}) => ({label: country_name, key: country_id})),
    [allCountries]
  )

  const states: IFormData<number>[] = useMemo(
    () => allStates.map(({state_id, state_name}) => ({label: state_name, key: state_id})),
    [allStates]
  )

  const cities: IFormData<number>[] = useMemo(
    () => allCities.map(({city_id, city_name}) => ({label: city_name, key: city_id})),
    [allCities]
  )

  useEffect(() => {
    if (userRes) {
      const {result, errorData} = userRes

      if (result) {
        push(ROUTE_INITIATE_TRANSACTION)
        updateUserData(result)
      } else
        toggleNotify({
          title: "Error - Update User",
          description: errorData?.message || "Something went wrong",
          type: "error",
        })
    }
  }, [userRes])

  useEffect(() => {
    if (user) {
      const {
        address_line_1,
        address_line_2,
        city,
        country,
        first_name,
        last_name,
        email,
        phone_no,
        state,
        zip_code,
        id_issued_country,
        id_number,
        id_type,
        kyc_attachments,
        account_no,
        account_type,
      } = user

      let payloadData: ISyncUserData = {
        ...data,
        address_line_1,
        address_line_2,
        first_name,
        last_name,
        email,
        phone_no,
        zip_code,
        id_number,
        id_type,
        account_no,
        account_type,
      }

      if (country) {
        const {country_id, country_name} = country

        payloadData = {
          ...payloadData,
          country: {label: country_name, key: country_id, isSelected: true},
        }
      }

      if (state) {
        const {state_id, state_name} = state

        payloadData = {
          ...payloadData,
          state: {label: state_name, key: state_id, isSelected: true},
        }
      }

      if (city) {
        const {city_id, city_name} = city

        payloadData = {
          ...payloadData,
          city: {label: city_name, key: city_id, isSelected: true},
        }
      }

      if (id_issued_country) {
        const {country_id, country_name} = id_issued_country

        payloadData = {
          ...payloadData,
          id_issued_country: {label: country_name, key: country_id, isSelected: true},
        }
      }

      if (kyc_attachments?.length) {
        payloadData = {
          ...payloadData,
          kyc: kyc_attachments.map(({url, attachment_id}) => ({attachment: {id: attachment_id, url}})),
        }
      }

      setData(payloadData)
    }
  }, [user])

  const onValidate = () => {
    let errState = {
      ...DEFAULT_ERR_STATE,
      isValid: true,
      isClicked: true,
    }

    if (!first_name) errState = {...errState, errFirstName: "Please enter First Name", isValid: false}

    if (!last_name) errState = {...errState, errLastName: "Please enter Last Name", isValid: false}

    if (!account_no) errState = {...errState, errAccountNo: "Please enter Account Number", isValid: false}

    if (!isValidInputByRegex(email, REG_EMAIL))
      errState = {...errState, errEmail: "Please Confirm Your E-mail", isValid: false}

    if (!address_line_1) errState = {...errState, errAddress: "Please enter Sender Address", isValid: false}

    if (!phone_no) errState = {...errState, errPhoneNo: "Please enter Phone Number", isValid: false}

    if (!country) errState = {...errState, errCountry: "Please select Country", isValid: false}

    if (!id_issued_country)
      errState = {...errState, errIdIssuedCountry: "Please Select ID issued Country", isValid: false}

    if (!id_type) errState = {...errState, errIdType: "Please Select ID type", isValid: false}

    if (!state) errState = {...errState, errState: "Please enter State", isValid: false}

    if (!city) errState = {...errState, errCity: "Please enter District", isValid: false}

    if (!zip_code) errState = {...errState, errZipCode: "Please enter Zip Code", isValid: false}

    if (!account_type) errState = {...errState, errAccountType: "Please enter account type", isValid: false}

    if (!kyc.length) errState = {...errState, errKyc: "Please choose valid KYC documents", isValid: false}

    if (user?.account_type === "Business") {
      if (!business_name) errState = {...errState, errBusinessName: "Please enter the company name", isValid: false}
    }

    if (!business_type) errState = {...errState, errBusinessType: "Please enter the Business type", isValid: false}

    setErrData(errState)

    return errState
  }

  const onChangeValue = (value: JSONObject) => setData(prev => ({...prev, ...value}))

  const onChangeCountry = (value: JSONObject) => onChangeValue({...value, state: null, city: null})

  const onChangeState = (value: JSONObject) => onChangeValue({...value, city: null})

  const individualForm: FormSectionProps[] = [
    {
      wrapperClassGrid: styles.sender_input_wrapper,
      childElements: [
        {
          elementType: "drop-down",
          name: "account_type",
          label: "Select Account type",
          options: ACCOUNT_TYPE,
          value: account_type,
          error: errAccountType,
          disabled: !!user?.account_type,
          onChangeValue,
        },
      ],
    },
    {
      title: "Personal Information",
      wrapperClassGrid: styles.personal_details,
      childElements: [
        {
          elementType: "input",
          label: "First Name",
          name: "first_name",
          error: errFirstName,
          value: first_name,
          disabled: !!user?.first_name,
          onChangeValue,
        },
        {
          elementType: "input",
          label: "Last Name",
          name: "last_name",
          error: errLastName,
          value: last_name,
          disabled: !!user?.last_name,
          onChangeValue,
        },
        {
          elementType: "input",
          label: "E-mail",
          name: "email",
          value: email,
          error: errEmail,
          disabled: !!user?.email,
          onChangeValue,
        },
        {
          elementType: "input",
          label: "Phone Number",
          name: "phone_no",
          error: errPhoneNo,
          value: phone_no,
          disabled: !!user?.phone_no,
          onChangeValue,
        },
        {
          elementType: "input",
          label: "Account Number",
          name: "account_no",
          disabled: !!user?.account_no,
          error: errAccountNo,
          value: account_no,
          onChangeValue,
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
          error: errAddress,
          value: address_line_1,
          onChangeValue,
        },
        {
          elementType: "input",
          label: "Address Line 2 (Optional)",
          name: "address_line_2",
          value: address_line_2,
          onChangeValue,
        },
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
          options: states,
          error: errState,
          disabled: !country,
          value: state,
          onChangeValue: onChangeState,
        },
        {
          elementType: "drop-down",
          label: "City/District",
          name: "city",
          options: cities,
          error: errCity,
          disabled: !state,
          value: city,
          onChangeValue,
        },
        {
          elementType: "input",
          label: "PinCode",
          name: "zip_code",
          value: zip_code,
          error: errZipCode,
          onChangeValue,
        },
      ],
    },
    {
      title: "Identification",
      wrapperClassGrid: `flex-col ${styles.id_types}`,
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
          name: "id_type",
          options: ID_PROOFS,
          error: errIdType,
          value: id_type,
          onChangeValue,
        },
        {
          elementType: "input",
          label: "Enter ID number",
          name: "id_number",
          error: errIdType,
          value: id_number,
          onChangeValue,
        },
        {
          elementType: "file-picker",
          fileType: ["image/*", "application/pdf"],
          name: "kyc",
          isMultiple: true,
          value: kyc,
          error: errKyc,
          children: <CustomUpload />,
          onChangeValue,
        },
      ],
    },
  ]

  const businessForm: FormSectionProps[] = [
    {
      wrapperClassGrid: styles.sender_input_wrapper,
      childElements: [
        {
          elementType: "drop-down",
          name: "account_type",
          label: "Select Account type",
          options: ACCOUNT_TYPE,
          value: account_type,
          error: errAccountType,
          disabled: !!user?.account_type,
          onChangeValue,
        },
        {
          elementType: "drop-down",
          name: "business_type",
          options: BUSINESS_TYPE,
          value: business_type,
          error: errBusinessType,
          onChangeValue,
        },
      ],
    },
    {
      title: "Business Details",
      wrapperClassGrid: styles.personal_details,
      childElements: [
        {
          elementType: "input",
          label: "Company Name",
          name: "business_name",
          error: errBusinessName,
          value: business_name,
          onChangeValue,
        },
        {
          elementType: "input",
          label: "Contact Person First Name",
          name: "first_name",
          error: errFirstName,
          value: first_name,
          disabled: !!user?.first_name,
          onChangeValue,
        },
        {
          elementType: "input",
          label: "Contact Person Last Name",
          name: "last_name",
          error: errLastName,
          value: last_name,
          disabled: !!user?.last_name,
          onChangeValue,
        },
        {
          elementType: "input",
          label: "Company e-mail",
          name: "email",
          value: email,
          error: errEmail,
          disabled: !!user?.email,
          onChangeValue,
        },
        {
          elementType: "input",
          label: "Company Phone Number",
          name: "phone_no",
          error: errPhoneNo,
          value: phone_no,
          disabled: !!user?.phone_no,
          onChangeValue,
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
          error: errAddress,
          value: address_line_1,
          onChangeValue,
        },
        {
          elementType: "input",
          label: "Address Line 2 (Optional)",
          name: "address_line_2",
          value: address_line_2,
          onChangeValue,
        },
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
          options: states,
          error: errState,
          disabled: !country,
          value: state,
          onChangeValue: onChangeState,
        },
        {
          elementType: "drop-down",
          label: "City/District",
          name: "city",
          options: cities,
          error: errCity,
          disabled: !state,
          value: city,
          onChangeValue,
        },
        {
          elementType: "input",
          label: "PinCode",
          name: "zip_code",
          value: zip_code,
          error: errZipCode,
          onChangeValue,
        },
      ],
    },
    {
      title: "Identification",
      wrapperClassGrid: `flex-col ${styles.id_types}`,
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
          name: "id_type",
          options: ID_PROOFS,
          error: errIdType,
          value: id_type,
          onChangeValue,
        },
        {
          elementType: "input",
          label: "Enter ID number",
          name: "id_number",
          error: errIdType,
          value: id_number,
          onChangeValue,
        },
        {
          elementType: "file-picker",
          fileType: ["image/*", "application/pdf"],
          name: "kyc",
          isMultiple: true,
          value: kyc,
          error: errKyc,
          children: <CustomUpload />,
          onChangeValue,
        },
      ],
    },
  ]

  useEffect(() => {
    if (isClicked) setErrData(prev => ({...prev, ...onValidate()}))
  }, [data, isClicked])

  const formElement: FormSectionProps[] = [
    {
      title: "Verification",
      wrapperClassGrid: styles.verify_wrapper,
      childElements: [
        {
          childElement: (
            <section className={`flex ${styles.pan_wrapper}`}>
              <TextField label="Enter Pan Number" name="pan" value={pan} onChangeData={onChangeValue} />
              <Button onClick={onVerify}>Verify</Button>
              {!!verification && (
                <>
                  <ImageView src={assets.ic_tick} alt="tick-image " imgSize={24} />
                  <h5 className={styles.verified_text}>{message}</h5>
                </>
              )}
            </section>
          ),
        },
      ],
    },
    {
      childElements: [
        {
          childElement: (
            <section className={`flex ${styles.pan_wrapper}`}>
              <TextField
                label="Enter Aaadhar Number"
                name="aadhaarNumber"
                value={aadhaarNumber}
                onChangeData={onChangeValue}
              />
              <Button onClick={toggle}>Verify</Button>
            </section>
          ),
        },
      ],
    },
  ]

  function onVerify() {
    verifyPan({pan})
  }

  const individualType = user?.account_type === "Individual"

  const onSubmit = () => {
    const {isValid} = onValidate()

    if (isValid) {
      updateUser({
        account_type,
        first_name,
        last_name,
        email,
        phone_no,
        country_id: country.key as number,
        state_id: state.key as number,
        address_line_1,
        address_line_2,
        city_id: city.key as number,
        zip_code,
        id_type,
        id_issued_country_id: id_issued_country.key as number,
        id_number,
        account_no,
        kyc: kyc.filter(({file}) => !!file),
      })
    }
  }

  return {
    formElement,
    individualForm,
    businessForm,
    individualType,
    onSubmit,
  }
}

export default useHandler

export const CustomUpload = (styles: IStyle) => (
  <section className={`flex ${styles.upload_container}`}>
    {/* <ImageView src={assets.ic_cloudUpload} alt={"upload"} imgSize={24} /> */}
    <h5 className={styles.text_wrapper}>Upload Front Side of the Document</h5>
  </section>
)

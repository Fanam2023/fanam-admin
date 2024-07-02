import {FormSectionProps, ImageView} from "@fanam-pkg/core-ui-sass"
import {IFormData, JSONObject, REG_EMAIL, useCommon, useCookies, useResize} from "@fanam-pkg/core-utils"
import {useRouter} from "next/navigation"
import {useEffect, useMemo, useState} from "react"
import {useQueries} from "@tanstack/react-query"
import {useSlider} from "@custom/ui"
import {IPayloadSyncRecipient, IStyle, ISycRecipient} from "@custom/utils"
import assets from "assets"
import {useLocationController} from "controller"
import {COOKIE_TRANSACTION_ID, ID_PROOFS, QUERY_COUNTRIES, ROUTE_REVIEW} from "utils"

const useHandler = (styles: IStyle) => {
  const {push} = useRouter()
  const {isDesktop} = useResize()
  const {toggleSlider} = useSlider()
  const {getCookie} = useCookies()
  const {isValidInputByRegex} = useCommon()
  const onAdd = () => push(ROUTE_REVIEW)
  const transId = getCookie(COOKIE_TRANSACTION_ID)
  const {getAllCountries, getCities, getStates} = useLocationController()

  const [data, setData] = useState<ISycRecipient>({
    first_name: "",
    last_name: "",
    account_no: "",
    bank_name: "",
    bank_code: "",
    bank_code_type: "",
    branch: "",
    bic: "",
    address_line1: "",
    address_line2: "",
    email: "",
    phone_no: "",
    country: null,
    state: null,
    city: null,
    zip_code: "",
    id_issued_country: null,
    id_type: "",
    id_number: "",
    account_type: [
      {label: "Individual", isSelected: true},
      {label: "Business", isSelected: false},
    ],
  })

  const {
    first_name,
    last_name,
    account_no,
    account_type,
    bank_name,
    bank_code,
    bank_code_type,
    branch,
    bic,
    address_line1,
    address_line2,
    email,
    phone_no,
    country,
    state,
    city,
    zip_code,
    id_issued_country,
    id_type,
  } = data

  const [errState, setErrState] = useState({
    isClicked: false,
    isValid: false,
    errFirstName: "",
    errLastName: "",
    errAccountNo: "",
    errAccountType: "",
    errBankName: "",
    errBankCode: "",
    errBankCodeType: "",
    errBranch: "",
    errBic: "",
    errAddressLine1: "",
    errAddressLine2: "",
    errPhone: "",
    errCountry: "",
    errEmail: "",
    errStateName: "",
    errCity: "",
    errZipCode: "",
    errIdIssuedCountry: "",
    errIdType: "",
  })

  const {isClicked} = errState

  const onValidate = () => {
    let errState = {
      errFirstName: "",
      errLastName: "",
      errAccountNo: "",
      errAccountType: "",
      errBankName: "",
      errBankCode: "",
      errBankCodeType: "",
      errBranch: "",
      errBic: "",
      errAddressLine1: "",
      errAddressLine2: "",
      errPhone: "",
      errCountry: "",
      errEmail: "",
      errStateName: "",
      errCity: "",
      errZipCode: "",
      errIdIssuedCountry: "",
      errIdType: "",
      isValid: true,
    }

    if (!first_name) errState = {...errState, errFirstName: "Please enter FirstName", isValid: false}

    if (!last_name) errState = {...errState, errLastName: "Please enter LastName", isValid: false}

    if (!account_no) errState = {...errState, errAccountNo: "Please enter your AccountNumber", isValid: false}

    if (!account_type) errState = {...errState, errAccountType: "Please enter your AccountType", isValid: false}

    if (!bank_name) errState = {...errState, errBankName: "Please enter your BankName", isValid: false}

    if (!bank_code) errState = {...errState, errBankCode: "Please enter your BankCode", isValid: false}

    if (!bank_code_type) errState = {...errState, errBankCodeType: "Please enter your BankCodeType", isValid: false}

    if (!branch) errState = {...errState, errBranch: "Please enter your Branch", isValid: false}

    if (!bic) errState = {...errState, errBic: "Please enter your Bic", isValid: false}

    if (!address_line1) errState = {...errState, errAddressLine1: "Please enter Your Address", isValid: false}

    if (!address_line2) errState = {...errState, errAddressLine2: "Please enter Your Address", isValid: false}

    if (!country) errState = {...errState, errCountry: "Please enter Country Name", isValid: false}

    if (!phone_no) errState = {...errState, errPhone: "Please enter PhoneNumber", isValid: false}

    if (!isValidInputByRegex(email, REG_EMAIL))
      errState = {...errState, errEmail: "Please enter E-mail ID", isValid: false}

    if (!state) errState = {...errState, errStateName: "Please enter State Name", isValid: false}

    if (!city) errState = {...errState, errCity: "Please enter Your City/District", isValid: false}

    if (!zip_code) errState = {...errState, errZipCode: "Please enter Your PinCode", isValid: false}

    if (!id_issued_country)
      errState = {...errState, errIdIssuedCountry: "Please Select ID issued Country", isValid: false}

    if (!id_type) errState = {...errState, errIdType: "Please Select ID type", isValid: false}

    return errState
  }

  const {
    errFirstName,
    errLastName,
    errAccountNo,
    errAccountType,
    errBankName,
    errBankCode,
    errBankCodeType,
    errBranch,
    errBic,
    errAddressLine1,
    errAddressLine2,
    errPhone,
    errCountry,
    errEmail,
    errStateName,
    errCity,
    errZipCode,
    errIdType,
    errIdIssuedCountry,
  } = errState

  const [{data: allCountries = []}, {data: allStates = []}, {data: allCities = []}] = useQueries({
    queries: [
      {queryKey: [QUERY_COUNTRIES], queryFn: getAllCountries},
      {
        queryKey: [`QUERY_STATES-${country?.key}`, country],
        queryFn: () => getStates(country?.key as string),
        enabled: !!country,
      },
      {
        queryKey: [`QUERY_CITIES-${state?.key}`, state],
        queryFn: () => getCities(state?.key as string),
        enabled: !!state,
      },
    ],
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
    if (isClicked) setErrState(prev => ({...prev, ...onValidate()}))
  }, [data, isClicked])

  const onChangeValue = (value: JSONObject) => setData(prev => ({...prev, ...value}))

  const onChangeCountry = (value: JSONObject) => onChangeValue({...value, state: null, city: null})

  const onChangeState = (value: JSONObject) => onChangeValue({...value, city: null})

  const formElements: FormSectionProps[] = [
    {
      wrapperClassGrid: styles.recipient_address_wrapper,
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
          label: "Enter your AccountType",
          name: "account_type",
          error: errAccountType,
          value: account_type,
          onChangeValue,
        },
        {
          elementType: "input",
          label: "Enter your BankName",
          name: "bank_name",
          error: errBankName,
          value: bank_name,
          onChangeValue,
        },
        {
          elementType: "input",
          label: "Enter BankCode",
          name: "bank_code",
          error: errBankCode,
          value: bank_code,
          onChangeValue,
        },
        {
          elementType: "input",
          label: "Enter BankCodeType ",
          name: "bank_code_type",
          error: errBankCodeType,
          value: bank_code_type,
          onChangeValue,
        },
        {
          elementType: "input",
          label: "Enter Branch ",
          name: "branch",
          error: errBranch,
          value: branch,
          onChangeValue,
        },
        {
          elementType: "input",
          label: "Enter bic",
          name: "bic",
          error: errBic,
          value: bic,
          onChangeValue,
        },
        {
          elementType: "input",
          label: "Enter your AddressLine1",
          name: "address_line1",
          error: errAddressLine1,
          value: address_line1,
          onChangeValue,
        },
        {
          elementType: "input",
          label: "Enter your AddressLine2",
          name: "address_line2",
          error: errAddressLine2,
          value: address_line2,
          onChangeValue,
        },
        {
          elementType: "input",
          label: "Enter your PhoneNumber",
          name: "phone_no",
          error: errPhone,
          value: phone_no,
          onChangeValue,
          maxLength: 10,
        },
        {
          elementType: "drop-down",
          label: "Enter your country",
          name: "country",
          options: countries,
          error: errCountry,
          value: country,
          onChangeValue: onChangeCountry,
        },
        {
          elementType: "input",
          label: "Enter your Email",
          name: "email",
          error: errEmail,
          value: email,
          onChangeValue,
        },
        {
          elementType: "drop-down",
          label: "Enter your State",
          name: "state",
          disabled: !country,
          options: states,
          error: errStateName,
          value: state,
          onChangeValue: onChangeState,
        },
        {
          elementType: "drop-down",
          label: "Enter your City",
          name: "city",
          disabled: !state,
          options: cities,
          error: errCity,
          value: city,
          onChangeValue,
        },
        {
          elementType: "input",
          label: "Enter your ZipCode",
          name: "zip_code",
          error: errZipCode,
          value: zip_code,
          onChangeValue,
        },
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
        // {
        //   elementType: "file-picker",
        //   fileType: "image/*",
        //   name: "id_back",
        //   isMultiple: false,
        //   children: <CustomUpload />,
        //   onChangeValue,
        // },
        // {
        //   elementType: "file-picker",
        //   fileType: "image/*",
        //   name: "id_back",
        //   isMultiple: false,
        //   children: <CustomUpload />,
        //   onChangeValue,
        // },
      ],
    },
  ]

  const onSubmit = () => {
    console.log(">>>>>>")
    const errState = {...onValidate(), isClicked: true}
    const {isValid} = errState
    setErrState(errState)
    const payload: IPayloadSyncRecipient = {
      first_name,
      last_name,
      address_line1,
      address_line2,
      email,
      phone_no,
      country_id: country.key as number,
      state_id: state.key as number,
      city_id: city.key as number,
      zip_code,
      id_issued_country_id: id_issued_country.key as number,
      id_number: id_type,
      transaction_id: transId,
      bank_account: {
        branch_address: branch,
        account_no: account_no,
        swift_code: bic,
        bank_name: bank_name,
        bank_code: bank_code,
        branch: branch,
        account_type: account_type.find(({isSelected}) => isSelected)?.label,
      },
    }

    return isValid ? payload : null
  }

  return {
    onChangeValue,
    onSubmit,
    onAdd,
    formElements,
    isDesktop,
    toggleSlider,
    transId,
  }
}

export default useHandler

export const CustomUpload = (styles: IStyle) => (
  <section className={`flex ${styles.upload_container}`}>
    <ImageView src={assets.ic_cloudUpload} alt={"upload"} imgSize={24} />
    <h5 className={styles.text_wrapper}>Upload Front Side of the Document</h5>
  </section>
)

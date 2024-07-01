import {FormSectionProps, ImageView, useNotifyPopup} from "@fanam-pkg/core-ui-sass"
import {IFormData, JSONObject, REG_EMAIL, useCommon} from "@fanam-pkg/core-utils"
import {useRouter} from "next/navigation"
import {useEffect, useMemo, useState} from "react"
import {useMutation, useQueries} from "@tanstack/react-query"
import {IStyle, ISyncUserData} from "@custom/utils"
import assets from "assets"
import {useAuthController, useLocationController} from "controller"
import {useSingleton} from "hooks"
import {ID_PROOFS, QUERY_COUNTRIES, QUERY_USER, ROUTE_HOME} from "utils"

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
  errAddressLine1: "",
  errAddressLine2: "",
  errCity: "",
  errZipCode: "",
  errIdIssuedCountry: "",
  errIdType: "",
}

const useHandler = (styles: IStyle) => {
  const {push} = useRouter()
  const {isValidInputByRegex} = useCommon()
  const {getAllCountries, getCities, getStates} = useLocationController()
  const {syncUser} = useAuthController()
  const {toggleNotify} = useNotifyPopup()
  const {updateUserData, user} = useSingleton()
  const [data, setData] = useState<ISyncUserData>({
    first_name: "",
    last_name: "",
    email: "",
    phone_no: "",
    address_line1: "",
    address_line2: "",
    country: null,
    state: null,
    zip_code: "",
    city: null,
    account_number: "",
    id_type: "",
    id_issued_country: null,
    account_type: [
      {label: "Individual", isSelected: true},
      {label: "Business", isSelected: false},
    ],
  })
  const [errData, setErrData] = useState(DEFAULT_ERR_STATE)

  const {
    first_name,
    last_name,
    email,
    account_number,
    phone_no,
    country,
    state,
    address_line1,
    address_line2,
    city,
    account_type,
    zip_code,
    id_type,
    id_issued_country,
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
    errAddressLine1,
    errAddressLine2,
    errCity,
    errZipCode,
  } = errData

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

  const {mutate: updateUser, data: userRes} = useMutation({mutationKey: [QUERY_USER], mutationFn: syncUser})

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
    if (userRes) {
      const {result, errorData} = userRes

      if (result) {
        push(ROUTE_HOME)
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
        account_number,
        address_line1,
        address_line2,
        account_type,
        city,
        country,
        first_name,
        last_name,
        email,
        phone_no,
        state,
        zip_code,
      } = user
      const {iso2, country_name} = country

      setData({
        ...data,
        account_number,
        address_line1,
        address_line2,
        account_type: data.account_type.map(({label, isSelected}) => ({label, isSelected: label === account_type})),
        // city,
        first_name,
        last_name,
        email,
        phone_no,
        // state,
        zip_code,
        // country: {label: country_name, key: iso2, isSelected: true},
      })
    }
  }, [user])

  useEffect(() => {
    onChangeValue({state: null, city: null})
  }, [country])

  useEffect(() => {
    onChangeValue({city: null})
  }, [state])

  const onValidate = () => {
    let errState = {
      ...DEFAULT_ERR_STATE,
      isValid: true,
      isClicked: true,
    }

    if (!first_name) errState = {...errState, errFirstName: "Please enter First Name", isValid: false}

    if (!last_name) errState = {...errState, errLastName: "Please enter Last Name", isValid: false}

    if (!account_number) errState = {...errState, errAccountNo: "Please enter Account Number", isValid: false}

    if (!isValidInputByRegex(email, REG_EMAIL))
      errState = {...errState, errEmail: "Please Confirm Your E-mail", isValid: false}

    if (!address_line1) errState = {...errState, errAddressLine1: "Please enter Sender Address", isValid: false}

    if (!address_line2) errState = {...errState, errAddressLine2: "Please enter Sender Address", isValid: false}

    if (!phone_no) errState = {...errState, errPhoneNo: "Please enter Phone Number", isValid: false}

    if (!country) errState = {...errState, errCountry: "Please select Country", isValid: false}

    if (!id_issued_country)
      errState = {...errState, errIdIssuedCountry: "Please Select ID issued Country", isValid: false}

    if (!id_type) errState = {...errState, errIdType: "Please Select ID type", isValid: false}

    if (!state) errState = {...errState, errState: "Please enter State", isValid: false}

    if (!city) errState = {...errState, errCity: "Please enter District", isValid: false}

    if (!zip_code) errState = {...errState, errZipCode: "Please enter Zip Code", isValid: false}

    if (account_type.every(({isSelected}) => !isSelected))
      errState = {...errState, errAccountType: "Please enter Zip Code", isValid: false}

    setErrData(errState)

    return errState
  }

  const onChangeValue = (value: JSONObject) => setData(prev => ({...prev, ...value}))

  const formElements: FormSectionProps[] = [
    {
      wrapperClassGrid: styles.sender_input_wrapper,
      childElements: [
        {
          elementType: "radio-button",
          name: "account_type",
          label: "Select Account type",
          options: account_type,
          error: errAccountType,
          onChangeValue,
        },
        {
          elementType: "input",
          label: "Enter First Name",
          name: "first_name",
          error: errFirstName,
          value: first_name,
          onChangeValue,
        },
        {
          elementType: "input",
          label: "Enter Last Name",
          name: "last_name",
          error: errLastName,
          value: last_name,
          onChangeValue,
        },
        {
          elementType: "input",
          label: "Enter Account Number",
          name: "account_number",
          error: errAccountNo,
          value: account_number,
          onChangeValue,
        },
        {
          elementType: "input",
          label: "Enter E-mail",
          name: "email",
          value: email,
          error: errEmail,
          onChangeValue,
        },
        {
          elementType: "input",
          label: "Enter Phone Number",
          name: "phone_no",
          error: errPhoneNo,
          value: phone_no,
          onChangeValue,
        },
        {
          elementType: "input",
          label: "Enter Address Line1",
          name: "address_line1",
          error: errAddressLine1,
          value: address_line1,
          onChangeValue,
        },
        {
          elementType: "input",
          label: "Enter Address Line2",
          name: "address_line2",
          error: errAddressLine2,
          value: address_line2,
          onChangeValue,
        },
        {
          elementType: "drop-down",
          label: "Select Country",
          name: "country",
          options: countries,
          error: errCountry,
          value: country,
          onChangeValue,
        },
        {
          elementType: "drop-down",
          label: "Select State",
          name: "state",
          options: states,
          error: errState,
          disabled: !country,
          value: state,
          onChangeValue,
        },
        {
          elementType: "drop-down",
          label: "Select City/District",
          name: "city",
          options: cities,
          error: errCity,
          disabled: !state,
          value: city,
          onChangeValue,
        },
        {
          elementType: "input",
          label: "Enter Zip Code",
          name: "zip_code",
          error: errZipCode,
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
          name: "id_type",
          options: ID_PROOFS,
          error: errIdType,
          value: id_type,
          onChangeValue,
        },
        {
          elementType: "file-picker",
          fileType: "image/*",
          name: "id_front",
          isMultiple: false,
          children: <CustomUpload />,
          onChangeValue,
        },
        {
          elementType: "file-picker",
          fileType: "image/*",
          name: "id_back",
          isMultiple: false,
          children: <CustomUpload />,
          onChangeValue,
        },
      ],
    },
  ]

  useEffect(() => {
    if (isClicked) setErrData(prev => ({...prev, ...onValidate()}))
  }, [data, isClicked])

  const onSubmit = () => {
    const {isValid} = onValidate()

    if (isValid) {
      updateUser({
        first_name,
        last_name,
        email,
        account_number,
        phone_no,
        country_code: allCountries.find(({country_id}) => country.key === country_id)?.iso2,
        state: state.label,
        address_line1,
        address_line2,
        city: city.label,
        account_type: account_type?.find(({isSelected}) => isSelected).label,
        zip_code,
        id_type,
        id_issued_country: allCountries.find(({country_id}) => country.key === country_id)?.iso2,
      })
    }
  }

  return {
    onSubmit,
    formElements,
  }
}

export default useHandler

export const CustomUpload = (styles: IStyle) => (
  <section className={`flex ${styles.upload_container}`}>
    <ImageView src={assets.ic_cloudUpload} alt={"upload"} imgSize={24} />
    <h5 className={styles.text_wrapper}>Upload Front Side of the Document</h5>
  </section>
)

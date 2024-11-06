import {FormSectionProps, ImageView, TextField, useNotifyPopup} from "@fanam-pkg/core-ui-sass"
import {IFormData, JSONObject, REG_EMAIL, REG_VALID_NUMBER, useReactQuery, useResize} from "@fanam-pkg/core-utils"
import {useRouter} from "next/navigation"
import {useEffect, useMemo, useState} from "react"
import {useMutation, useQueries, useQuery} from "@tanstack/react-query"
import {useSlider} from "@custom/ui"
import {IBeneficiaryData, IPayloadBeneficiary, IStyle, REG_INPUT_EMAIL, REG_INPUT_NAME} from "@custom/utils"
import assets from "assets"
import {useBeneficiaryController, useLocationController, useTransactionController} from "controller"
import {useCommon, useSingleton} from "hooks"
import {CountryFlag} from "organisms"
import {
  QUERY_BENEFICIARY,
  QUERY_CITIES,
  QUERY_COUNTRIES,
  QUERY_STATES,
  RELATION_SHIP,
  ROUTE_BENEFICIARY_PREVIEW,
} from "utils"

const DEFAULT_ERROR_STATE = {
  isClicked: false,
  isValid: false,
  errFirstName: "",
  errLastName: "",
  errEmail: "",
  errRelation: "",
  errNumber: "",
  errAddress: "",
  errCountry: "",
  errStateName: "",
  errCity: "",
  errZipCode: "",
  errAccountNo: "",
}

export const useHandler = (styles: IStyle, beneficiaryId: string) => {
  const {isDesktop} = useResize()
  const {transData, transId: transaction_id, refetchTransaction} = useSingleton()
  const {push} = useRouter()
  const {toggleSlider} = useSlider()
  const {refreshQuery} = useReactQuery()
  const {toggleNotify} = useNotifyPopup()
  const {isValidInputByRegex} = useCommon()
  const {getTransactionCountries, getCities, getStates} = useLocationController()
  const {getByBeneficiaryId, createBeneficiary, updateBeneficiary} = useBeneficiaryController()
  const {syncBeneficiary} = useTransactionController()
  const {getCountryCode, getNationalNumber} = useCommon()
  const [showCountry, setShowCountry] = useState(false)
  const {recipient} = transData || {}

  const [data, setData] = useState<IBeneficiaryData>({
    first_name: "",
    last_name: "",
    phone_no: "",
    email: "",
    relationship: null,
    address: "",
    country: null,
    state: null,
    city: null,
    zip_code: "",
    account_no: "",
    notes: "",
  })

  const {
    first_name,
    last_name,
    phone_no,
    email,
    relationship,
    address,
    country,
    state,
    city,
    zip_code,
    account_no,
    notes,
  } = data

  const [errState, setErrState] = useState(DEFAULT_ERROR_STATE)

  const {isClicked} = errState

  const onValidate = () => {
    let errState = {...DEFAULT_ERROR_STATE, isValid: true, isClicked: true}

    if (!first_name) {
      errState = {
        ...errState,
        errFirstName: "Please enter First Name",
        isValid: false,
      }
    } else if (first_name.length < 2)
      errState = {
        ...errState,
        errFirstName: "FirstName must be longer than or equal to 2 characters",
        isValid: false,
      }

    if (!last_name) errState = {...errState, errLastName: "Please enter Last Name", isValid: false}

    if (!isValidInputByRegex(email, REG_EMAIL)) errState = {...errState, errEmail: "Please enter Email", isValid: false}

    if (!phone_no) errState = {...errState, errNumber: "Please enter your Phone Number", isValid: false}

    if (!relationship)
      errState = {...errState, errRelation: "Please enter your Relationship with sender", isValid: false}

    if (!address) errState = {...errState, errAddress: "Please enter Beneficiary Address", isValid: false}

    if (!country) {
      errState = {
        ...errState,
        errNumber: "Please select country",
        isValid: false,
      }
    } else if (!phone_no || phone_no.length !== nationalNumberLength) {
      errState = {
        ...errState,
        errNumber: `Please enter a valid phone number with ${nationalNumberLength} digits`,
        isValid: false,
      }
    }

    if (!state) errState = {...errState, errStateName: "Please enter State Name", isValid: false}

    if (!city) errState = {...errState, errCity: "Please enter your City/District", isValid: false}

    if (!zip_code) errState = {...errState, errZipCode: "Please enter Pin Code", isValid: false}

    setErrState(errState)
    return errState
  }

  const {
    errFirstName,
    errLastName,
    errEmail,
    errNumber,
    errRelation,
    errAddress,
    errCountry,
    errStateName,
    errCity,
    errZipCode,
    errAccountNo,
  } = errState

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

  const {data: beneficiaryData} = useQuery({
    queryKey: [QUERY_BENEFICIARY.concat(beneficiaryId)],
    queryFn: () => getByBeneficiaryId(beneficiaryId),
  })

  function onSuccess(message: string) {
    toggleNotify({
      type: "success",
      title: message,
      description: "Beneficiary added Successfully",
    })
  }

  function onFailure(message: string) {
    toggleNotify({
      type: "error",
      title: message,
    })
  }

  const {mutate: addBeneficiary} = useMutation({
    mutationKey: [QUERY_BENEFICIARY],
    mutationFn: createBeneficiary,
    onSuccess: ({result, errorData}) => {
      if (result) {
        const beneficiary_id = result?.beneficiary_id
        refreshQuery(QUERY_BENEFICIARY)
        syncBeneficiary(beneficiary_id)
        toggleSlider()
        push(ROUTE_BENEFICIARY_PREVIEW)
        onSuccess("Beneficiary added Successfully")
      } else onFailure(errorData.message)
    },
  })

  const {mutate: onUpdate} = useMutation({
    mutationKey: [QUERY_BENEFICIARY],
    mutationFn: updateBeneficiary,
    onSuccess: ({result, errorData}) => {
      refreshQuery(QUERY_BENEFICIARY)
      if (result) {
        toggleSlider()
        onSuccess("Beneficiary Successfully updated")
        refetchTransaction()
      } else onFailure(errorData.message)
    },
  })

  const countries: IFormData<number>[] = useMemo(
    () => allCountries.map(({country_id, country_name}) => ({key: country_id, label: country_name})),
    [allCountries]
  )

  const states: IFormData<number>[] = useMemo(
    () => allStates.map(({state_id, state_name}) => ({key: state_id, label: state_name})),
    [allStates]
  )

  const cities: IFormData<number>[] = useMemo(
    () => allCities.map(({city_id, city_name}) => ({key: city_id, label: city_name})),
    [allCities]
  )

  useEffect(() => {
    if (beneficiaryData) {
      const {
        first_name,
        last_name,
        country,
        state,
        city,
        relationship,
        email,
        phone_no,
        zip_code,
        address,
        account_no,
        notes,
      } = beneficiaryData

      const {country_id, country_name} = country || {}
      const {state_id, state_name} = state || {}
      const {city_id, city_name} = city || {}

      setData({
        first_name,
        last_name,
        country: {label: country_name, key: country_id},
        state: {label: state_name, key: state_id},
        city: {label: city_name, key: city_id},
        address,
        relationship: RELATION_SHIP.find(({key}) => key === relationship),
        email,
        phone_no,
        zip_code,
        account_no,
        notes,
      })
    }
  }, [beneficiaryData])

  useEffect(() => {
    if (!country && recipient) {
      const {country_id, country_name} = recipient.country
      setData(prev => ({...prev, country: {key: country_id, label: country_name}}))
    }
  }, [transData])

  useEffect(() => {
    if (isClicked) setErrState(prev => ({...prev, ...onValidate()}))
  }, [data, isClicked])

  const onChangeValue = (value: JSONObject) => {
    const phoneNO = (value?.phone_no as string) || ""
    const isValid = phoneNO === "" || isValidInputByRegex(phoneNO, REG_VALID_NUMBER)
    if (isValid && phoneNO.length <= nationalNumberLength) setData(prev => ({...prev, ...value}))
  }

  const onChangeCountry = (value: JSONObject) => onChangeValue({...value, state: null, city: null, phone_no: ""})

  const onChangeState = (value: JSONObject) => onChangeValue({...value, city: null})

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
  const formElements: FormSectionProps[] = [
    {
      title: "Personal Information",
      wrapperClassGrid: styles.details_wrapper,
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
    },

    {
      wrapperClassGrid: styles.beneficiary_address_wrapper,
      childElements: [
        {
          elementType: "input",
          label: "Email",
          name: "email",
          error: errEmail,
          value: email,
          inputRegex: REG_INPUT_EMAIL,
          onChangeValue,
        },
        {
          childElement: (
            <>
              <section className={`flex-start ${styles.input_wrapper}`}>
                <section className={`flex ${styles.country_wrapper} ${errNumber ? styles.error_border : ""}`}>
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
              <h5>{errNumber && <p className={styles.error_message}>{errNumber}</p>}</h5>
            </>
          ),
        },
        {
          elementType: "drop-down",
          label: "Relationship with the Sender",
          name: "relationship",
          error: errRelation,
          value: relationship,
          options: RELATION_SHIP,
          onChangeValue,
        },
        {
          elementType: "input",
          label: "Account Number",
          isRequired: false,
          name: "account_no",
          error: errAccountNo,
          value: account_no,
          inputRegex: REG_VALID_NUMBER,
          onChangeValue,
        },
        {
          elementType: "text-area",
          label: "Add Notes",
          isRequired: false,
          name: "notes",
          value: notes,
          onChangeValue,
          maxLength: 50,
          wrapperClass: styles.text_area_wrapper,
        },
      ],
    },
    {
      title: "Address",
      wrapperClassGrid: styles.address,
      childElements: [
        {
          elementType: "input",
          label: "Home Address",
          name: "address",
          error: errAddress,
          value: address,
          maxLength: 75,
          onChangeValue,
        },
      ],
    },
    {
      wrapperClassGrid: styles.address_wrapper,
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
          error: errStateName,
          value: state,
          onChangeValue: onChangeState,
        },
        {
          elementType: "drop-down",
          label: "City/District",
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
          value: zip_code,
          inputRegex: REG_VALID_NUMBER,
          error: errZipCode,
          onChangeValue,
        },
      ],
    },
  ]

  const onSubmit = () => {
    const {isValid} = onValidate()
    if (isValid) {
      const payload: IPayloadBeneficiary = {
        first_name,
        last_name,
        email,
        phone_no,
        address,
        country_id: country.key,
        state_id: state.key,
        city_id: city.key,
        zip_code,
        relationship: relationship?.key,
        transaction_id,
        account_no,
        notes,
      }
      if (beneficiaryId) onUpdate({...payload, beneficiary_id: beneficiaryId})
      else addBeneficiary(payload)
    }
  }

  return {
    formElements,
    isDesktop,
    onChangeValue,
    onSubmit,
    toggleSlider,
    showCountry,
    onSelectCountry,
    data,
    allCountries,
    selectedCountry,
    setShowCountry,
  }
}

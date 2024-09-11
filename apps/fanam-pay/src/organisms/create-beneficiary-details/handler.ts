import {FormSectionProps, useNotifyPopup} from "@fanam-pkg/core-ui-sass"
import {IFormData, JSONObject, REG_EMAIL, useCommon, useReactQuery, useResize} from "@fanam-pkg/core-utils"
import {useRouter} from "next/navigation"
import {useEffect, useMemo, useState} from "react"
import {useMutation, useQueries} from "@tanstack/react-query"
import {useSlider} from "@custom/ui"
import {IBeneficiaryData, IPayloadBeneficiary, IStyle} from "@custom/utils"
import {useBeneficiaryController, useLocationController, useTransactionController} from "controller"
import {useSingleton} from "hooks"
import {QUERY_BENEFICIARY, QUERY_CITIES, QUERY_COUNTRIES, QUERY_STATES, ROUTE_BENEFICIARY_PREVIEW} from "utils"

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
  const {transData, transId: transaction_id} = useSingleton()
  const {push} = useRouter()
  const {toggleSlider} = useSlider()
  const {refreshQuery} = useReactQuery()
  const {toggleNotify} = useNotifyPopup()
  const {isValidInputByRegex} = useCommon()
  const {getAllCountries, getCities, getStates} = useLocationController()
  const {getByBeneficiaryId, createBeneficiary, updateBeneficiary} = useBeneficiaryController()
  const {syncBeneficiary} = useTransactionController()

  const [data, setData] = useState<IBeneficiaryData>({
    first_name: "",
    last_name: "",
    phone_no: "",
    email: "",
    relationship: "",
    address: "",
    country: null,
    state: null,
    city: null,
    zip_code: "",
    account_no: "",
  })

  const {first_name, last_name, phone_no, email, relationship, address, country, state, city, zip_code, account_no} =
    data

  const [errState, setErrState] = useState(DEFAULT_ERROR_STATE)

  const {isClicked} = errState

  const onValidate = () => {
    let errState = {...DEFAULT_ERROR_STATE, isValid: true, isClicked: true}

    if (!first_name) errState = {...errState, errFirstName: "Please enter first Name", isValid: false}

    if (!last_name) errState = {...errState, errLastName: "Please enter last Name", isValid: false}
    else if (last_name.length < 2) errState = {...errState, errLastName: "LastName must be longer than 2 characters"}

    if (!isValidInputByRegex(email, REG_EMAIL))
      errState = {...errState, errEmail: "Please enter E-mail ID", isValid: false}

    if (!phone_no) errState = {...errState, errNumber: "Please Confirm Ac Number", isValid: false}

    if (!relationship)
      errState = {...errState, errRelation: "Please enter Your Relationship with sender", isValid: false}

    if (!address) errState = {...errState, errAddress: "Please enter Beneficiary Address", isValid: false}

    if (!country) errState = {...errState, errCountry: "Please enter Country Name", isValid: false}

    if (!state) errState = {...errState, errStateName: "Please enter Sate Name", isValid: false}

    if (!city) errState = {...errState, errCity: "Please enter Your City/District", isValid: false}

    if (!zip_code) errState = {...errState, errZipCode: "Please enter Your ZipCode", isValid: false}

    if (!account_no) errState = {...errState, errAccountNo: "Please enter Your ZipCode", isValid: false}

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

  const [{data: allCountries = []}, {data: allStates = []}, {data: allCities = []}, {data: beneficiaryData}] =
    useQueries({
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
        {
          queryKey: [`${QUERY_BENEFICIARY}-${beneficiaryId}`, state],
          queryFn: () => getByBeneficiaryId(beneficiaryId as string),
          enabled: !!beneficiaryId,
        },
      ],
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

  const {mutate: addBeneficiary, data: addedRes} = useMutation({
    mutationKey: [QUERY_BENEFICIARY],
    mutationFn: createBeneficiary,
    onSuccess: ({result, errorData}) => {
      if (result) {
        const beneficiary_id = result?.beneficiary_id
        refreshQuery(QUERY_BENEFICIARY)
        syncBeneficiary(beneficiary_id)
        onSuccess("Beneficiary added Successfully")
      } else onFailure(errorData.message)
    },
  })

  const {mutate: onUpdate, data: updatedRes} = useMutation({
    mutationKey: [QUERY_BENEFICIARY],
    mutationFn: updateBeneficiary,
    onSuccess: ({result, errorData}) => {
      refreshQuery(QUERY_BENEFICIARY)
      if (result) onSuccess("Beneficiary Successfully updated")
      else onFailure(errorData.message)
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
        relationship,
        email,
        phone_no,
        zip_code,
        account_no,
      })
    }
  }, [beneficiaryData])

  useEffect(() => {
    if (isClicked) setErrState(prev => ({...prev, ...onValidate()}))
  }, [data, isClicked])

  const onChangeValue = (value: JSONObject) => setData(prev => ({...prev, ...value}))

  const onChangeCountry = (value: JSONObject) => onChangeValue({...value, state: null, city: null})

  const onChangeState = (value: JSONObject) => onChangeValue({...value, city: null})

  const formElements: FormSectionProps[] = [
    {
      title: "Personal Information",
      wrapperClassGrid: styles.details_wrapper,
      childElements: [
        {
          elementType: "input",
          label: "first Name",
          name: "first_name",
          error: errFirstName,
          value: first_name,
          onChangeValue,
        },
        {
          elementType: "input",
          label: "last Name",
          name: "last_name",
          error: errLastName,
          value: last_name,
          onChangeValue,
        },
      ],
    },
    {
      wrapperClassGrid: `flex ${styles.beneficiary_address_wrapper}`,
      childElements: [
        {
          elementType: "input",
          label: "Email-ID",
          name: "email",
          error: errEmail,
          value: email,
          onChangeValue,
        },
        {
          elementType: "input",
          label: "Phone Number",
          name: "phone_no",
          error: errNumber,
          value: phone_no,
          onChangeValue,
          maxLength: 10,
        },
        {
          elementType: "input",
          label: "Relationship with the Sender",
          name: "relationship",
          error: errRelation,
          value: relationship,
          onChangeValue,
        },
        {
          elementType: "input",
          label: "Account Number (Optional)",
          name: "account_no",
          error: errAccountNo,
          value: account_no,
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
          label: "Home Address",
          name: "address",
          error: errAddress,
          value: address,
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
          label: "Zip Code",
          name: "zip_code",
          value: zip_code,
          error: errZipCode,
          onChangeValue,
        },
      ],
    },
  ]

  useEffect(() => {
    if (addedRes) {
      toggleSlider()
      push(ROUTE_BENEFICIARY_PREVIEW)
    } else if (updatedRes) {
      toggleSlider()
    }
  }, [addedRes, updatedRes])

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
        relationship,
        transaction_id,
        account_no,
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
  }
}

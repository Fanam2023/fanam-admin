import {FormSectionProps, useNotifyPopup} from "@fanam-pkg/core-ui-sass"
import {IFormData, JSONObject, REG_EMAIL, useCommon, useReactQuery, useResize} from "@fanam-pkg/core-utils"
import {useRouter} from "next/navigation"
import {useEffect, useMemo, useState} from "react"
import {useMutation, useQueries} from "@tanstack/react-query"
import {useSlider} from "@custom/ui"
import {IBeneficiaryData, IPayloadBeneficiary, IStyle} from "@custom/utils"
import {useBeneficiaryController, useLocationController} from "controller"
import {useSingleton} from "hooks"
import {QUERY_BENEFICIARY, QUERY_CITIES, QUERY_COUNTRIES, QUERY_STATES, ROUTE_PAYMENT_OPTIONS} from "utils"

const DEFAULT_ERROR_STATE = {
  isClicked: false,
  isValid: false,
  errName: "",
  errEmail: "",
  errRelation: "",
  errNumber: "",
  errAddressLine1: "",
  errAddressLine2: "",
  errCountry: "",
  errStateName: "",
  errCity: "",
  errZipCode: "",
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

  const onRouteToOptions = () => push(ROUTE_PAYMENT_OPTIONS)

  const [data, setData] = useState<IBeneficiaryData>({
    beneficiary_name: "",
    phone_no: "",
    email: "",
    relationship: "",
    address_line1: "",
    address_line2: "",
    country: null,
    state: null,
    city: null,
    zip_code: "",
  })

  const {
    beneficiary_name,
    phone_no,
    email,
    relationship,
    address_line1,
    address_line2,
    country,
    state,
    city,
    zip_code,
  } = data

  const [errState, setErrState] = useState(DEFAULT_ERROR_STATE)

  const {isClicked} = errState

  const onValidate = () => {
    let errState = {...DEFAULT_ERROR_STATE, isValid: true, isClicked: true}

    if (!beneficiary_name) errState = {...errState, errName: "Please enter Beneficiary Name", isValid: false}

    if (!isValidInputByRegex(email, REG_EMAIL))
      errState = {...errState, errEmail: "Please enter E-mail ID", isValid: false}

    if (!phone_no) errState = {...errState, errNumber: "Please Confirm Ac Number", isValid: false}

    if (!relationship)
      errState = {...errState, errRelation: "Please enter Your Relationship with sender", isValid: false}

    if (!address_line1) errState = {...errState, errAddressLine1: "Please enter Beneficiary Address", isValid: false}

    if (!address_line2) errState = {...errState, errAddressLine2: "Please enter Beneficiary Address", isValid: false}

    if (!country) errState = {...errState, errCountry: "Please enter Country Name", isValid: false}

    if (!state) errState = {...errState, errStateName: "Please enter Sate Name", isValid: false}

    if (!city) errState = {...errState, errCity: "Please enter Your City/District", isValid: false}

    if (!zip_code) errState = {...errState, errZipCode: "Please enter Your ZipCode", isValid: false}

    setErrState(errState)
    return errState
  }

  const {
    errName,
    errEmail,
    errNumber,
    errRelation,
    errAddressLine1,
    errAddressLine2,
    errCountry,
    errStateName,
    errCity,
    errZipCode,
  } = errState

  const [{data: allCountries = []}, {data: allStates = []}, {data: allCities = []}, {data: beneficiaryData}] =
    useQueries({
      queries: [
        {queryKey: [QUERY_COUNTRIES], queryFn: getAllCountries},
        {
          queryKey: [`${QUERY_STATES}-${country?.key}`, country],
          queryFn: () => getStates(country?.key as string),
          enabled: !!country,
        },
        {
          queryKey: [`${QUERY_CITIES}-${country?.key}`, state],
          queryFn: () => getCities(state?.key as string),
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

  const {mutate: addBeneficiary} = useMutation({
    mutationKey: [QUERY_BENEFICIARY],
    mutationFn: createBeneficiary,
    onSuccess: ({result, errorData}) => {
      refreshQuery(QUERY_BENEFICIARY)
      if (result) onSuccess("Beneficiary added Successfully")
      else onFailure(errorData.message)
    },
  })

  const {mutate: onUpdate} = useMutation({
    mutationKey: [QUERY_BENEFICIARY],
    mutationFn: updateBeneficiary,
    onSuccess: ({result, errorData}) => {
      refreshQuery(QUERY_BENEFICIARY)
      if (result) onSuccess("Beneficiary Successfully updated")
      else onFailure(errorData.message)
    },
  })

  const countries: IFormData[] = useMemo(
    () => allCountries.map(({country_id, country_name}) => ({key: country_id, label: country_name})),
    [allCountries]
  )

  const states: IFormData[] = useMemo(
    () => allStates.map(({state_id, state_name}) => ({key: state_id, label: state_name})),
    [allStates]
  )

  const cities: IFormData[] = useMemo(
    () => allCities.map(({city_id, city_name}) => ({key: city_id, label: city_name})),
    [allCities]
  )

  useEffect(() => {
    if (beneficiaryData) {
      const {
        beneficiary_name,
        country,
        state,
        city,
        relationship,
        email,
        phone_no,
        zip_code,
        address_line1,
        address_line2,
      } = beneficiaryData

      const {country_id, country_name} = country || {}
      const {state_id, state_name} = state || {}
      const {city_id, city_name} = city || {}

      setData({
        beneficiary_name,
        country: {label: country_name, key: country_id},
        state: {label: state_name, key: state_id},
        city: {label: city_name, key: city_id},
        address_line1,
        address_line2,
        relationship,
        email,
        phone_no,
        zip_code,
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
      wrapperClassGrid: styles.beneficiary_address_wrapper,
      childElements: [
        {
          elementType: "input",
          label: "Enter Beneficiary Name",
          name: "beneficiary_name",
          error: errName,
          value: beneficiary_name,
          onChangeValue,
        },
        {
          elementType: "input",
          label: "Enter E-Mail ID",
          name: "email",
          error: errEmail,
          value: email,
          onChangeValue,
        },
        {
          elementType: "input",
          label: "Enter Phone Number",
          name: "phone_no",
          error: errNumber,
          value: phone_no,
          onChangeValue,
          maxLength: 10,
        },
        {
          elementType: "input",
          label: "Enter Relationship with Sender",
          name: "relationship",
          error: errRelation,
          value: relationship,
          onChangeValue,
        },
        {
          elementType: "input",
          label: "Enter Address line1",
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
          label: "Enter Country",
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
          error: errStateName,
          value: state,
          onChangeValue: onChangeState,
        },
        {
          elementType: "drop-down",
          label: "Enter City/District",
          name: "city",
          disabled: !state,
          options: cities,
          error: errCity,
          value: city,
          onChangeValue,
        },
        {
          elementType: "input",
          label: "Enter Zip Code",
          name: "zip_code",
          value: zip_code,
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
        beneficiary_name,
        email,
        phone_no,
        address_line1,
        address_line2,
        country_id: country.key as number,
        state_id: state.key as number,
        city_id: city.key as number,
        zip_code,
        relationship,
        transaction_id,
      }
      if (beneficiaryId) {
        onUpdate(payload)
        toggleSlider()
      } else {
        addBeneficiary(payload)
        toggleSlider()
        onRouteToOptions()
      }
    }
  }

  return {
    formElements,
    isDesktop,
    onChangeValue,
    onSubmit,
    onRouteToOptions,
    toggleSlider,
  }
}

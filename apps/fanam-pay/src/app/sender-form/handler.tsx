import {Button, FormSectionProps, ImageView, TextField, useNotifyPopup, usePopup} from "@fanam-pkg/core-ui-sass"
import {IFormData, JSONObject, REG_EMAIL, REG_VALID_NUMBER, useCommon, useDateTime} from "@fanam-pkg/core-utils"
import {useRouter} from "next/navigation"
import {useEffect, useMemo, useState} from "react"
import {useMutation, useQueries} from "@tanstack/react-query"
import {
  DF_INPUT_DATE,
  IAadhaarCaptcha,
  IResponseKYC,
  IStyle,
  ISyncUserData,
  REG_AADHAAR,
  REG_INPUT_DATE,
  REG_INPUT_EMAIL,
  REG_INPUT_NAME,
  REG_PAN,
} from "@custom/utils"
import assets from "assets"
import {useAuthController, useKYCController, useLocationController} from "controller"
import {useSingleton} from "hooks"
import {PopupAadhaarCaptcha, PopupAadhaarOTP} from "organisms"
import {
  ACCOUNT_TYPE,
  BUSINESS_TYPE,
  QUERY_CITIES,
  QUERY_COUNTRIES,
  QUERY_PAN_CARD,
  QUERY_STATES,
  QUERY_USER,
  ROUTE_HOME,
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
  errDateOfBirth: "",
  errKycAadhaar: "",
  errKycPAN: "",
  errBusinessName: "",
  errPan: "",
  errAadhaarNumber: "",
  errBusinessType: "",
}

const useHandler = (styles: IStyle) => {
  const {replace, push} = useRouter()
  const {isValidInputByRegex} = useCommon()
  const {getAllCountries, getCities, getStates} = useLocationController()
  const {syncUser} = useAuthController()
  const {verifyPanCard, generateAadhaarCaptcha, reGenerateAadhaarCaptcha, generateAadhaarOTP, verifyAadhaarOTP} =
    useKYCController()
  const {formatDateUTC, formatDate, dayjs} = useDateTime()
  const {toggleNotify} = useNotifyPopup()
  const {togglePopup} = usePopup()
  const {user, updateUserData} = useSingleton()
  const currentDate = dayjs().format("YYYY-MM-DD")
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
    // account_no: "",
    account_type: ACCOUNT_TYPE[0],
    pan: "",
    aadhaarNumber: "",
    business_name: "",
    business_type: {key: "Sole_proprietor", label: "Sole Proprietor"},
    date_of_birth: "",
    kyc_aadhaar: [],
    kyc_pan: [],
  })
  const [errData, setErrData] = useState(DEFAULT_ERR_STATE)

  const {
    first_name,
    last_name,
    email,
    // account_no,
    phone_no,
    country,
    state,
    address_line_1,
    address_line_2,
    city,
    account_type,
    zip_code,
    kyc_pan,
    kyc_aadhaar,
    pan,
    aadhaarNumber,
    business_name,
    business_type,
    date_of_birth,
  } = data

  const {
    isClicked,
    isValid,
    errFirstName,
    errLastName,
    errEmail,
    errPhoneNo,
    errAccountType,
    errCountry,
    errState,
    errAddress,
    errCity,
    errZipCode,
    errKycAadhaar,
    errKycPAN,
    errBusinessName,
    errBusinessType,
    errDateOfBirth,
  } = errData

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

  const {mutate: updateUser} = useMutation({
    mutationKey: [QUERY_USER],
    mutationFn: syncUser,
    onSuccess: ({result, errorData}) => {
      if (result) replace(ROUTE_HOME)
      else
        toggleNotify({
          title: "Error - Update User",
          description: errorData?.message || "Something went wrong",
          type: "error",
        })
    },
  })

  const {mutate: onVerifyPan} = useMutation({
    mutationKey: [QUERY_PAN_CARD],
    mutationFn: verifyPanCard,
    onSuccess: ({result, errorData}) => {
      const {message} = errorData || {}
      if (result) {
        const {user} = result
        updateUserData({...user, kyc_details: result?.user?.kyc_details})
        toggleNotify({
          title: "Success",
          description: "PAN card verified successfully!",
          type: "success",
        })
      } else
        toggleNotify({
          title: "Error - PAN Verification",
          description: message || "PAN verification failed. Please try again.",
          type: "error",
        })
    },
  })

  const onGenerateOTP = (captchaCode: string) => generateOTP({captchaCode, aadhaarNumber})

  const {mutate: generateCaptcha} = useMutation({
    mutationFn: generateAadhaarCaptcha,
    onSuccess: ({result, errorData}) => {
      const {captcha} = result || {}
      const {message} = errorData || {}
      if (result) {
        toggleNotify({
          title: "Aadhaar CAPTCHA",
          description: "Captcha generated successfully",
          type: "success",
        })
        togglePopup({
          title: "Verify Captcha",
          children: (
            <PopupAadhaarCaptcha
              captchaCode={captcha.captchaImage}
              regenerateCaptcha={regenerateCaptcha}
              generateOTP={onGenerateOTP}
            />
          ),
          isClosable: true,
        })
      } else
        toggleNotify({
          title: "Error - Captcha!",
          description: message || "Failed to generate Captcha",
          type: "error",
        })
    },
  })

  const onVerifyOTP = (otp: string) => verifyOTP({otp, aadhaarNumber})

  const {mutate: generateOTP} = useMutation({
    mutationFn: generateAadhaarOTP,
    onSuccess: ({result, errorData}) => {
      const {message} = errorData || {}
      if (result) {
        const {user} = result
        updateUserData({...user, kyc_details: result?.user?.kyc_details})
        toggleNotify({
          title: "Aadhaar OTP",
          description: "OTP Sent successfully",
          type: "success",
        })
        togglePopup({
          title: "Verify Aadhaar",
          children: <PopupAadhaarOTP verifyOTP={onVerifyOTP} />,
          isClosable: true,
        })
      } else
        toggleNotify({
          title: "Error - OTP!",
          description: message || "Failed to generate OTP to the Aadhaar linked phone number",
          type: "error",
        })
    },
  })

  const {mutate: verifyOTP} = useMutation({
    mutationFn: verifyAadhaarOTP,
    onSuccess: ({result, errorData}) => {
      const {message} = errorData || {}
      if (result) {
        const {user} = result
        updateUserData({...user, kyc_details: result?.user?.kyc_details})
        toggleNotify({
          title: "OTP Verification",
          description: "OTP Verified successfully",
          type: "success",
        })
        togglePopup()
      } else
        toggleNotify({
          title: "Error - OTP Verification!",
          description: message || "Something went wrong",
          type: "error",
        })
    },
  })

  const onRegenerate = ({captchaRetriesRemaining}: IAadhaarCaptcha) => {
    if (captchaRetriesRemaining > 1) {
      togglePopup()
      regenerateCaptcha()
    } else
      toggleNotify({
        title: "Error - Aadhaar Captcha!",
        description: "No of regenerating captcha is exceeded",
        type: "error",
      })
  }

  const {mutate: regenerateCaptcha} = useMutation({
    mutationFn: reGenerateAadhaarCaptcha,
    onSuccess: ({result, errorData}) => {
      const {message} = errorData || {}
      if (result) {
        const {captcha} = result

        toggleNotify({
          title: "Aadhaar Captcha",
          description: "Regenerated Aadhaar captcha successfully!",
          type: "success",
        })

        togglePopup({
          title: "Verify Captcha",
          children: (
            <PopupAadhaarCaptcha
              captchaCode={captcha.captchaImage}
              regenerateCaptcha={onRegenerate.bind(null, captcha)}
              generateOTP={onGenerateOTP}
            />
          ),
          isClosable: true,
        })
      } else
        toggleNotify({
          title: "Error - Aadhaar Captcha!",
          description: message || "Something went wrong",
          type: "error",
        })
    },
  })

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

  const {verifiedAadhaar, verifiedPAN} = useMemo(() => {
    const {kyc_details = []} = user || {}

    const verification: {verifiedAadhaar: IResponseKYC | null; verifiedPAN: IResponseKYC | null} = {
      verifiedAadhaar: null,
      verifiedPAN: null,
    }
    if (kyc_details?.length) {
      const {verifiedAadhaar, verifiedPAN} = verification
      for (const kyc of kyc_details) {
        const {is_verified, type, kyc_number} = kyc
        if (verifiedAadhaar && verifiedPAN) break
        else if (is_verified) {
          if (type === "Aadhaar") verification.verifiedAadhaar = kyc
          else if (type === "PAN") verification.verifiedPAN = kyc
        }
      }
    }

    return verification
  }, [user])

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
        // account_no,
        account_type,
        date_of_birth,
      } = user

      let payloadData: ISyncUserData = {
        ...data,
      }

      if (address_line_1) payloadData.address_line_1 = address_line_1
      if (address_line_2) payloadData.address_line_2 = address_line_2
      if (first_name) payloadData.first_name = first_name
      if (last_name) payloadData.last_name = last_name
      if (email) payloadData.email = email
      if (phone_no) payloadData.phone_no = phone_no
      if (zip_code) payloadData.zip_code = zip_code
      if (date_of_birth) payloadData.date_of_birth = formatDate(date_of_birth, DF_INPUT_DATE)
      // if (account_no) payloadData.account_no = account_no
      if (account_type) payloadData.account_type = ACCOUNT_TYPE.find(({key}) => key === account_type)

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

      if (verifiedAadhaar) {
        const {kyc_number, attachments = []} = verifiedAadhaar
        payloadData = {
          ...payloadData,
          aadhaarNumber: kyc_number,
          kyc_aadhaar: attachments.map(({url, attachment_id}) => ({attachment: {id: attachment_id, url}})),
        }
      }

      if (verifiedPAN) {
        const {kyc_number, attachments = []} = verifiedPAN
        payloadData = {
          ...payloadData,
          pan: kyc_number,
          kyc_pan: attachments.map(({url, attachment_id}) => ({attachment: {id: attachment_id, url}})),
        }
      }

      setData(payloadData)
    }
  }, [user, verifiedPAN, verifiedAadhaar])

  const onValidate = () => {
    let errState = {
      ...DEFAULT_ERR_STATE,
      isValid: true,
      isClicked: true,
    }

    if (!first_name) errState = {...errState, errFirstName: "Please enter First Name", isValid: false}

    if (!last_name) errState = {...errState, errLastName: "Please enter Last Name", isValid: false}

    // if (!account_no) errState = {...errState, errAccountNo: "Please enter Account Number", isValid: false}

    if (!isValidInputByRegex(email, REG_EMAIL))
      errState = {...errState, errEmail: "Please Confirm Your E-mail", isValid: false}

    if (!address_line_1) errState = {...errState, errAddress: "Please enter Sender Address", isValid: false}

    if (!phone_no) errState = {...errState, errPhoneNo: "Please enter Phone Number", isValid: false}

    if (!country) errState = {...errState, errCountry: "Please select Country", isValid: false}

    if (!state) errState = {...errState, errState: "Please enter State", isValid: false}

    if (!city) errState = {...errState, errCity: "Please enter District", isValid: false}

    if (!zip_code) errState = {...errState, errZipCode: "Please enter Zip Code", isValid: false}

    if (!account_type) errState = {...errState, errAccountType: "Please enter account type", isValid: false}

    if (!kyc_aadhaar.length)
      errState = {...errState, errKycAadhaar: "Please choose valid Aadhaar KYC documents", isValid: false}

    if (!kyc_pan.length) errState = {...errState, errKycPAN: "Please choose valid PAN KYC documents", isValid: false}

    if (user?.account_type === "Business") {
      if (!business_name) errState = {...errState, errBusinessName: "Please enter the company name", isValid: false}
    }

    if (!business_type) errState = {...errState, errBusinessType: "Please enter the Business type", isValid: false}

    setErrData(errState)

    return errState
  }

  const onChangeValue = (value: JSONObject) => setData(prev => ({...prev, ...value}))

  const onChangeData = (value: JSONObject) => {
    const formattedDate = formatDateUTC(value?.date_of_birth as string)
    onChangeValue({...value, date_of_birth: formattedDate})
  }

  const onChangeCountry = (value: JSONObject) => onChangeValue({...value, state: null, city: null})

  const onChangeState = (value: JSONObject) => onChangeValue({...value, city: null})

  const addressForm: FormSectionProps = {
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
        inputRegex: REG_VALID_NUMBER,
        error: errZipCode,
        onChangeValue,
      },
    ],
  }

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
          inputRegex: REG_INPUT_NAME,
          onChangeValue,
        },
        {
          elementType: "input",
          label: "Last Name",
          name: "last_name",
          error: errLastName,
          inputRegex: REG_INPUT_NAME,
          value: last_name,
          onChangeValue,
        },
        {
          elementType: "input",
          label: "E-mail",
          name: "email",
          value: email,
          error: errEmail,
          disabled: !!user?.email,
          inputRegex: REG_INPUT_EMAIL,
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
        // {
        //   elementType: "input",
        //   label: "Account Number",
        //   name: "account_no",
        //   disabled: !!user?.account_no,
        //   error: errAccountNo,
        //   value: account_no,
        //   onChangeValue,
        // },
        {
          childElement: (
            <TextField
              type="date"
              label="Date of Birth"
              name="date_of_birth"
              value={formatDate(date_of_birth, DF_INPUT_DATE)}
              error={errDateOfBirth}
              inputRegex={REG_INPUT_DATE}
              max={currentDate}
              onChangeData={onChangeData}></TextField>
          ),
        },
      ],
    },
    addressForm,
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
          inputRegex: REG_INPUT_NAME,
          onChangeValue,
        },
        {
          elementType: "input",
          label: "Contact Person Last Name",
          name: "last_name",
          error: errLastName,
          value: last_name,
          disabled: !!user?.last_name,
          inputRegex: REG_INPUT_NAME,
          onChangeValue,
        },
        {
          elementType: "input",
          label: "Company e-mail",
          name: "email",
          value: email,
          error: errEmail,
          disabled: !!user?.email,
          inputRegex: REG_INPUT_EMAIL,
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
    addressForm,
  ]

  useEffect(() => {
    if (isClicked) setErrData(prev => ({...prev, ...onValidate()}))
  }, [data, isClicked])

  const individualKYCElements: FormSectionProps = useMemo(() => {
    const elements: FormSectionProps = {
      title: "Verification",
      wrapperClassGrid: styles.verify_wrapper,
      childElements: [
        {
          childElement: (
            <>
              <section className={`flex-start ${styles.pan_wrapper} `}>
                <TextField
                  label="Enter Aadhaar Number"
                  name="aadhaarNumber"
                  value={aadhaarNumber}
                  disabled={!!verifiedAadhaar}
                  onChangeData={onChangeValue}
                  inputRegex={REG_VALID_NUMBER}
                  maxLength={12}
                  wrapperClass={styles.text_field}
                />
                {!verifiedAadhaar && (
                  <Button
                    wrapperClass={styles.verify_btn}
                    disabled={!isValidInputByRegex(aadhaarNumber, REG_AADHAAR)}
                    onClick={generateCaptcha.bind(null, null)}>
                    Verify
                  </Button>
                )}
              </section>
              {verifiedAadhaar && (
                <section className={`flex-start ${styles.pan_verify}`}>
                  <ImageView src={assets.ic_tick} alt="tick-image " imgSize={24} />
                  <h5 className={styles.verified_text}>Aadhaar is Validated</h5>
                </section>
              )}
            </>
          ),
        },
      ],
    }

    if (verifiedAadhaar) {
      elements.childElements.push({
        elementType: "file-picker",
        fileType: ["image/*", "application/pdf"],
        wrapperClass: styles.img_picker,
        name: "kyc_aadhaar",
        isMultiple: true,
        value: kyc_aadhaar,
        maxCount: 2,
        error: errKycAadhaar,
        children: <CustomUpload />,
        disabled: !verifiedAadhaar,
        onChangeValue,
      })
    }

    if (verifiedAadhaar && kyc_aadhaar) {
      elements.childElements.push({
        childElement: (
          <>
            <section className={`flex-start ${styles.pan_wrapper}`}>
              <TextField
                label="Enter Pan Number"
                name="pan"
                value={pan}
                onChangeData={onChangeValue}
                disabled={!!verifiedPAN}
                maxLength={10}
              />
              {!verifiedPAN && (
                <Button
                  disabled={!isValidInputByRegex(pan, REG_PAN)}
                  onClick={onVerifyPan.bind(null, {pan})}
                  wrapperClass={styles.verify_btn}>
                  Verify
                </Button>
              )}
            </section>
            {verifiedPAN && (
              <section className={`flex-start ${styles.pan_verify}`}>
                <ImageView src={assets.ic_tick} alt="tick-image " imgSize={24} />
                <h5 className={styles.verified_text}>PAN is Validated</h5>
              </section>
            )}
          </>
        ),
      })
    }

    if (verifiedPAN) {
      elements.childElements.push({
        elementType: "file-picker",
        fileType: ["image/*", "application/pdf"],
        wrapperClass: styles.img_picker,
        name: "kyc_pan",
        isMultiple: true,
        maxCount: 2,
        value: kyc_pan,
        error: errKycPAN,
        children: <CustomUpload />,
        disabled: !verifyPanCard,
        onChangeValue,
      })
    }

    return elements
  }, [user, data, errData])

  const individualType = user?.account_type === "Individual"

  const onSubmit = () => {
    const {isValid} = onValidate()

    if (isValid) {
      updateUser({
        account_type: account_type.key,
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
        // account_no,
        kyc_aadhaar: kyc_aadhaar.filter(({file}) => !!file),
        kyc_pan: kyc_pan.filter(({file}) => !!file),
        date_of_birth: formatDateUTC(date_of_birth),
      })
    }
  }

  const onBack = () => push(ROUTE_HOME)

  return {
    individualKYCElements,
    individualForm,
    businessForm,
    individualType,
    onSubmit,
    onBack,
  }
}

export default useHandler

export const CustomUpload = (styles: IStyle) => (
  <section className={`flex ${styles.upload_container}`}>
    {/* <ImageView src={assets.ic_cloudUpload} alt={"upload"} imgSize={24} /> */}
    <h5 className={styles.text_wrapper}>Upload Front Side of the Document</h5>
  </section>
)

import {FormSectionProps} from "@fanam-pkg/core-ui-sass"
import {JSONObject, useCookies, useResize} from "@fanam-pkg/core-utils"
import {useRouter} from "next/navigation"
import {useEffect, useState} from "react"
import {useSlider} from "@custom/ui"
import {IRecipient} from "@custom/utils"
import {COOKIE_TRANSACTION_ID, ROUTE_REVIEW} from "utils"
import styles from "./styles.module.sass"

export const useHandler = () => {
  const {push} = useRouter()
  const {isDesktop} = useResize()
  const {toggleSlider} = useSlider()
  const {getCookie} = useCookies()
  const onAdd = () => push(ROUTE_REVIEW)
  const transId = getCookie(COOKIE_TRANSACTION_ID)

  const [data, setData] = useState({
    recipient_name: "",
    account_no: "",
    sender_type: "",
    account_type: "",
    bank_name: "",
    bank_code: "",
    bank_code_type: "",
    branch: "",
    bic: "",
    address_line1: "",
    address_line2: "",
    email: "",
    phone_no: "",
    country: "",
    state: "",
    city: "",
    zip_code: "",
    id: "",
  })

  const {
    recipient_name,
    account_no,
    sender_type,
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
    id,
  } = data

  const [errState, setErrState] = useState({
    isClicked: false,
    isValid: false,
    errRecipientName: "",
    errAccountNo: "",
    errSenderType: "",
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
    errId: "",
  })

  const {isClicked} = errState

  const onValidate = () => {
    let errState = {
      errRecipientName: "",
      errAccountNo: "",
      errSenderType: "",
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
      errId: "",
      isValid: true,
    }

    if (!recipient_name) errState = {...errState, errRecipientName: "Please enter RecipientName", isValid: false}

    if (!account_no) errState = {...errState, errAccountNo: "Please enter your AccountNumber", isValid: false}

    if (!sender_type) errState = {...errState, errSenderType: "Please enter your SenderType", isValid: false}

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

    if (!email) errState = {...errState, errEmail: "Please enter E-mail ID", isValid: false}

    if (!state) errState = {...errState, errStateName: "Please enter State Name", isValid: false}

    if (!city) errState = {...errState, errCity: "Please enter Your City/District", isValid: false}

    if (!zip_code) errState = {...errState, errZipCode: "Please enter Your PinCode", isValid: false}

    if (!id) errState = {...errState, errId: "Please your id", isValid: false}

    return errState
  }

  useEffect(() => {
    if (isClicked) setErrState(prev => ({...prev, ...onValidate()}))
  }, [data, isClicked])

  const onChangeValue = (value: JSONObject) => setData(prev => ({...prev, ...value}))

  const onSubmit = () => {
    const errState = {...onValidate(), isClicked: true}
    const {isValid} = errState
    setErrState(errState)
    const payload: IRecipient = {
      recipient_name,
      sender_type,
      address_line1,
      address_line2,
      email,
      phone_no,
      country_code: country,
      state,
      city,
      zip_code,
      id: "Aadhaar",
      transaction_id: transId,
      bank_account: {
        account_no: account_no,
        swift_code: bic,
        bank_name: bank_name,
        branch_code: bank_code,
        branch_address: branch,
        account_type: account_type,
      },
    }

    return isValid ? payload : null
  }

  const {
    errRecipientName,
    errAccountNo,
    errSenderType,
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
    errId,
  } = errState

  const formElements: FormSectionProps[] = [
    {
      wrapperClassGrid: styles.recipient_address_wrapper,
      childElements: [
        {
          elementType: "input",
          label: "Enter Recipient Name",
          name: "recipient_name",
          value: recipient_name,
          error: errRecipientName,
          onChangeValue,
        },
        {
          elementType: "input",
          label: "Enter Account Number",
          name: "account_no",
          value: account_no,
          error: errAccountNo,
          onChangeValue,
        },
        {
          elementType: "input",
          label: "Enter your SenderType(Savings/Current)",
          name: "sender_type",
          value: sender_type,
          error: errSenderType,
          onChangeValue,
        },
        {
          elementType: "input",
          label: "Enter your AccountType",
          name: "account_type",
          value: account_type,
          error: errAccountType,
          onChangeValue,
        },
        {
          elementType: "input",
          label: "Enter your BankName",
          name: "bank_name",
          value: bank_name,
          error: errBankName,
          onChangeValue,
        },
        {
          elementType: "input",
          label: "Enter BankCode",
          name: "bank_code",
          value: bank_code,
          error: errBankCode,
          onChangeValue,
        },
        {
          elementType: "input",
          label: "Enter BankCodeType ",
          name: "bank_code_type",
          value: bank_code_type,
          error: errBankCodeType,
          onChangeValue,
        },
        {
          elementType: "input",
          label: "Enter Branch ",
          name: "branch",
          value: branch,
          error: errBranch,
          onChangeValue,
        },
        {
          elementType: "input",
          label: "Enter bic",
          name: "bic",
          value: bic,
          error: errBic,
          onChangeValue,
        },
        {
          elementType: "input",
          label: "Enter your AddressLine1",
          name: "address_line1",
          value: address_line1,
          error: errAddressLine1,
          onChangeValue,
        },
        {
          elementType: "input",
          label: "Enter your AddressLine2",
          name: "address_line2",
          value: address_line2,
          error: errAddressLine2,
          onChangeValue,
        },
        {
          elementType: "input",
          label: "Enter your PhoneNumber",
          name: "phone_no",
          value: phone_no,
          error: errPhone,
          onChangeValue,
          maxLength: 10,
        },
        {
          elementType: "input",
          label: "Enter your country",
          name: "country",
          value: country,
          error: errCountry,
          onChangeValue,
        },
        {
          elementType: "input",
          label: "Enter your Email",
          name: "email",
          value: email,
          error: errEmail,
          onChangeValue,
        },
        {
          elementType: "input",
          label: "Enter your State",
          name: "state",
          value: state,
          error: errStateName,
          onChangeValue,
        },
        {
          elementType: "input",
          label: "Enter your City",
          name: "city",
          value: city,
          error: errCity,
          onChangeValue,
        },
        {
          elementType: "input",
          label: "Enter your ZipCode",
          name: "zip_code",
          value: zip_code,
          error: errZipCode,
          onChangeValue,
        },
        {
          elementType: "input",
          label: "Enter your Id",
          name: "id",
          value: id,
          error: errId,
          onChangeValue,
        },
      ],
    },
  ]

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

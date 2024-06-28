import {FormSectionProps} from "@fanam-pkg/core-ui-sass"
import {IFormData, JSONObject} from "@fanam-pkg/core-utils"
import {useRouter} from "next/navigation"
import {useEffect, useRef, useState} from "react"
import {ROUTE_HOME} from "utils"
import styles from "./sender.module.sass"

const useHandler = (onSuccess: (message: string) => void, onFailure: (message: string) => void) => {
  const {push} = useRouter()
  const [dropDownLabel, setDropDownLabel] = useState("Purpose of Sending Money")
  const [frontFile, setFrontFile] = useState(null)
  const [backFile, setBackFile] = useState(null)
  const frontFileInputRef = useRef(null)
  const backFileInputRef = useRef(null)

  const handleDropDown = () => {
    setDropDownLabel("")
  }

  const onAttachment = (event, type) => {
    const file = event.target.files[0]
    if (file) {
      const fileSizeInKB = (file.size / 1024).toFixed(2)
      if (type === "front") setFrontFile({name: file.name, size: `${fileSizeInKB} KB`})
      else if (type === "back") setBackFile({name: file.name, size: `${fileSizeInKB} KB`})
    }
  }

  const onRemove = type => {
    if (type === "front") setFrontFile(null)
    else if (type === "back") setBackFile(null)
  }

  const onBrowse = type => {
    if (type === "front") frontFileInputRef.current.click()
    else if (type === "back") backFileInputRef.current.click()
  }

  const uploadSections = [
    {
      type: "front",
      file: frontFile,
      label: "Upload Front Side of the Document",
      onBrowse: () => onBrowse("front"),
      onAttachment: e => onAttachment(e, "front"),
      onRemove: () => onRemove("front"),
      fileInputRef: frontFileInputRef,
    },
    {
      type: "back",
      file: backFile,
      label: "Upload Back Side of the Document",
      onBrowse: () => onBrowse("back"),
      onAttachment: e => onAttachment(e, "back"),
      onRemove: () => onRemove("back"),
      fileInputRef: backFileInputRef,
    },
  ]

  const [senderType, setSenderType] = useState<IFormData[]>([
    {label: "Individual", isSelected: false},
    {label: "Business", isSelected: false},
  ])

  const onSelectSenderType = (selectedItems: IFormData[]) => {
    setSenderType(selectedItems)
  }

  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    account_number: "",
    phone_number: "",
    country: "",
    state: "",
    sender_address: "",
    district: "",
    zip_code: "",
  })

  const {
    first_name,
    last_name,
    email,
    account_number,
    phone_number,
    country,
    state,
    sender_address,
    district,
    zip_code,
  } = data

  const [errState, setErrState] = useState({
    isClicked: false,
    isValid: false,
    errfirstName: "",
    errsecondName: "",
    errEmail: "",
    errPhnNumber: "",
    errAcNumber: "",
    errCountry: "",
    errStatte: "",
    errAddress: "",
    errDistrict: "",
    errZip: "",
  })

  const {isClicked} = errState

  const onValidate = () => {
    let errState = {
      errfirstName: "",
      errsecondName: "",
      errEmail: "",
      errPhnNumber: "",
      errAcNumber: "",
      errCountry: "",
      errStatte: "",
      errAddress: "",
      errDistrict: "",
      errZip: "",
      isValid: true,
    }
    if (!first_name) errState = {...errState, errfirstName: "Please enter First Name", isValid: false}

    if (!last_name) errState = {...errState, errsecondName: "Please enter Last Name", isValid: false}

    if (!account_number) errState = {...errState, errAcNumber: "Please enter Account Number", isValid: false}

    if (!email) errState = {...errState, errEmail: "Please Confirm Your E-mail", isValid: false}

    if (!sender_address) errState = {...errState, errAddress: "Please enter Sender Address", isValid: false}

    if (!phone_number) errState = {...errState, errPhnNumber: "Please enter Phone Number", isValid: false}

    if (!country) errState = {...errState, errCountry: "Please enter Country", isValid: false}

    if (!state) errState = {...errState, errStatte: "Please enter State", isValid: false}

    if (!district) errState = {...errState, errDistrict: "Please enter District", isValid: false}

    if (!zip_code) errState = {...errState, errZip: "Please enter Zip Code", isValid: false}

    return errState
  }

  const {
    errfirstName,
    errsecondName,
    errEmail,
    errPhnNumber,
    errAddress,
    errAcNumber,
    errCountry,
    errDistrict,
    errStatte,
    errZip,
  } = errState

  const onChangeValue = (value: JSONObject) => setData(prev => ({...prev, ...value}))

  const formElements: FormSectionProps[] = [
    {
      wrapperClassGrid: styles.sender_input_wrapper,
      childElements: [
        {
          elementType: "input",
          label: "Enter Sender First Name",
          name: "name",
          error: errfirstName,
          onChangeValue,
        },
        {
          elementType: "input",
          label: "Enter Sender Last Name",
          name: "name",
          error: errsecondName,
          onChangeValue,
        },
        {
          elementType: "input",
          label: "Enter Account Number",
          name: "account_number",
          error: errAcNumber,
          onChangeValue,
        },
        {
          elementType: "input",
          label: "Enter E-mail",
          name: "email",
          error: errEmail,
          onChangeValue,
        },
        {
          elementType: "input",
          label: "Enter Address",
          name: "address",
          error: errAddress,
          onChangeValue,
        },
        {
          elementType: "input",
          label: "Enter Phone Number",
          name: "phone_number",
          error: errPhnNumber,
          maxLength: 10,
          onChangeValue,
        },
        {
          elementType: "input",
          label: "Enter Country",
          name: "country_name",
          error: errCountry,
          onChangeValue,
        },
        {
          elementType: "input",
          label: "Enter State",
          name: "state_name",
          error: errStatte,
          onChangeValue,
        },
        {
          elementType: "input",
          label: "Enter City/District",
          name: "city_name",
          error: errDistrict,
          onChangeValue,
        },
        {
          elementType: "input",
          label: "Enter Zip Code",
          name: "zip_code",
          error: errZip,
          onChangeValue,
        },
      ],
    },
  ]

  useEffect(() => {
    if (isClicked) setErrState(prev => ({...prev, ...onValidate()}))
  }, [data, isClicked])

  const onSubmit = () => {
    const errState = {...onValidate(), isClicked: true}
    const {isValid} = errState
    setErrState(errState)
    if (isValid) {
      onSuccess("Form submitted successfully!")
      push(ROUTE_HOME)
    } else onFailure("Form submission failed. Please check your inputs.")
  }

  return {
    errState,
    onChangeValue,
    onSubmit,
    formElements,
    data,
    senderType,
    onSelectSenderType,
    dropDownLabel,
    handleDropDown,
    uploadSections,
  }
}

export default useHandler

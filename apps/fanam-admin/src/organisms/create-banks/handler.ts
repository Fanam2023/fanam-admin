import {FormSectionProps} from "@fanam-pkg/core-ui-sass"
import {JSONObject} from "@fanam-pkg/core-utils"
import {useEffect, useState} from "react"
import {IStyle} from "@custom/utils"
import {IBank, IPayloadBank} from "model"

const DEFAULT_ERR_STATE = {
  isClicked: false,
  isValid: false,
  errBankName: "",
  errMobile: "",
  errContactPerson: "",
  errEmail: "",
  errDesignation: "",
  errAlternative: "",
}

export const useHandler = (styles: IStyle, user: IBank) => {
  const [data, setData] = useState<IBank>({
    client_id: "",
    bank_name: "",
    mobile: "",
    contact_person_name: "",
    email: "",
    alternative: "",
    designation: "",
  })

  const [errState, setErrState] = useState(DEFAULT_ERR_STATE)

  useEffect(() => {
    if (user) {
      setData({
        client_id: user.client_id || "",
        bank_name: user.bank_name || "",
        mobile: user.mobile || "",
        contact_person_name: user.contact_person_name || "",
        email: user.email || "",
        alternative: user.alternative || "",
        designation: user.designation || "",
      })
    }
  }, [user])

  const onValidate = () => {
    let newErrState = {...DEFAULT_ERR_STATE, isClicked: true, isValid: true}

    if (!data.bank_name.trim()) {
      newErrState.errBankName = "Bank name is required"
      newErrState.isValid = false
    }
    if (!data.mobile.trim()) {
      newErrState.errMobile = "Mobile number is required"
      newErrState.isValid = false
    }
    if (!data.contact_person_name.trim()) {
      newErrState.errContactPerson = "Contact Person is required"
      newErrState.isValid = false
    }
    if (!data.email.trim()) {
      newErrState.errEmail = "Email is required"
      newErrState.isValid = false
    }
    if (!data.designation.trim()) {
      newErrState.errDesignation = "Designation is required"
      newErrState.isValid = false
    }
    if (!data.alternative.trim()) {
      newErrState.errAlternative = "Alternative is required"
      newErrState.isValid = false
    }

    setErrState(newErrState)
    return newErrState
  }

  useEffect(() => {
    if (errState.isClicked) {
      onValidate()
    }
  }, [data])

  const onChangeValue = (data: JSONObject) => {
    setData(prev => ({
      ...prev,
      ...data,
    }))

    if (errState.isClicked) {
      onValidate()
    }
  }

  const formElements: FormSectionProps = {
    wrapperClassGrid: styles.main_container,
    childElements: [
      {
        elementType: "input",
        label: "Bank name",
        name: "bank_name",
        onChangeValue,
        isRequired: true,
        error: errState.errBankName,
      },
      {
        elementType: "input",
        label: "Mobile",
        name: "mobile",
        onChangeValue,
        isRequired: true,
        error: errState.errMobile,
      },
      {
        elementType: "input",
        label: "Contact Person",
        name: "contact_person_name",
        onChangeValue,
        isRequired: true,
        error: errState.errContactPerson,
      },
      {
        elementType: "input",
        label: "E-mail",
        name: "email",
        onChangeValue,
        isRequired: true,
        error: errState.errEmail,
      },
      {
        elementType: "input",
        label: "Alternative Number",
        name: "alternative",
        onChangeValue,
        isRequired: false,
        error: errState.errAlternative,
      },
      {
        elementType: "input",
        label: "Designation",
        name: "designation",
        onChangeValue,
        isRequired: true,
        error: errState.errDesignation,
      },
    ],
  }

  const onSubmit = () => {
    const {isValid} = onValidate()
    if (isValid) {
      const payload: IPayloadBank = {...data}
      console.log("Submitting payload:", payload)
    }
  }

  return {
    formElements,
    onSubmit,
  }
}

export default useHandler

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

export const useHandler = (styles: IStyle) => {
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

  const onValidate = () => {
    let newErrState = {...DEFAULT_ERR_STATE, isClicked: true, isValid: true}
    const {bank_name, mobile, contact_person_name, email, designation, alternative} = data

    if (bank_name) {
      newErrState.errBankName = "Bank name is required"
      newErrState.isValid = false
    }
    if (mobile) {
      newErrState.errMobile = "Mobile number is required"
      newErrState.isValid = false
    }
    if (contact_person_name) {
      newErrState.errContactPerson = "Contact Person is required"
      newErrState.isValid = false
    }
    if (email) {
      newErrState.errEmail = "Email is required"
      newErrState.isValid = false
    }
    if (designation) {
      newErrState.errDesignation = "Designation is required"
      newErrState.isValid = false
    }
    if (alternative) {
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
      },
      {
        elementType: "input",
        label: "Mobile",
        name: "mobile",
        onChangeValue,
        isRequired: true,
      },
      {
        elementType: "input",
        label: "Contact Person",
        name: "contact_person_name",
        onChangeValue,
        isRequired: true,
      },
      {
        elementType: "input",
        label: "E-mail",
        name: "email",
        onChangeValue,
        isRequired: true,
      },
      {
        elementType: "input",
        label: "Alternative Number",
        name: "alternative",
        onChangeValue,
        isRequired: false,
      },
      {
        elementType: "input",
        label: "Designation",
        name: "designation",
        onChangeValue,
        isRequired: true,
      },
    ],
  }

  const onSubmit = () => {
    const {isValid} = onValidate()
    if (isValid) {
      const payload: IPayloadBank = {...data}
    }
  }

  return {
    formElements,
    onSubmit,
  }
}

export default useHandler

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

  const {bank_name, mobile, contact_person_name, email, designation, alternative} = data
  const {errBankName, errMobile, errContactPerson, errEmail, errDesignation, errAlternative} = errState

  const onValidate = () => {
    let errState = {...DEFAULT_ERR_STATE, isClicked: true, isValid: true}

    if (!bank_name) {
      errState = {...errState, errBankName: "Please enter Bank Name", isValid: false}
    }
    if (!mobile) {
      errState = {...errState, errMobile: "Please enter Mobile Number", isValid: false}
    }
    if (!contact_person_name) {
      errState = {...errState, errContactPerson: "Please enter Contact Person", isValid: false}
    }
    if (!email) {
      errState = {...errState, errEmail: "Please enter Email", isValid: false}
    }
    if (!designation) {
      errState = {...errState, errDesignation: "Please enter Designation", isValid: false}
    }
    if (!alternative) {
      errState = {...errState, errAlternative: "Please enter Alternative Number", isValid: false}
    }

    setErrState(errState)
    return errState
  }

  useEffect(() => {
    if (errState.isClicked) {
      onValidate()
    }
  }, [data])

  const onChangeValue = (newData: JSONObject) => {
    setData(prev => ({
      ...prev,
      ...newData,
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
        value: bank_name,
        error: errBankName,
      },
      {
        elementType: "input",
        label: "Mobile",
        name: "mobile",
        onChangeValue,
        isRequired: true,
        value: mobile,
        error: errMobile,
      },
      {
        elementType: "input",
        label: "Contact Person",
        name: "contact_person_name",
        onChangeValue,
        isRequired: true,
        value: contact_person_name,
        error: errContactPerson,
      },
      {
        elementType: "input",
        label: "E-mail",
        name: "email",
        onChangeValue,
        isRequired: true,
        value: email,
        error: errEmail,
      },
      {
        elementType: "input",
        label: "Alternative Number",
        name: "alternative",
        onChangeValue,
        isRequired: false,
        value: alternative,
        error: errAlternative,
      },
      {
        elementType: "input",
        label: "Designation",
        name: "designation",
        onChangeValue,
        isRequired: true,
        value: designation,
        error: errDesignation,
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

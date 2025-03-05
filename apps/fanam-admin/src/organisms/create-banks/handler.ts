import {FormSectionProps, useNotifyPopup} from "@fanam-pkg/core-ui-sass"
import {JSONObject, useReactQuery} from "@fanam-pkg/core-utils"
import {useEffect, useState} from "react"
import {useMutation} from "@tanstack/react-query"
import {useSlider} from "@custom/ui"
import {IStyle} from "@custom/utils"
import {useBankController} from "controller"
import {IPayloadBank} from "model"
import {QUERY_BANK, QUERY_BANK_DETAIL} from "utils"

const DEFAULT_ERR_STATE = {
  isClicked: false,
  isValid: false,
  errBankName: "",
  errMobile: "",
  errContactPerson: "",
  errEmail: "",
  errDesignation: "",
}

export const useHandler = (styles: IStyle, details: IPayloadBank, refetch: () => void, clientId: string) => {
  const {refreshQuery} = useReactQuery()
  const {toggleNotify} = useNotifyPopup()
  const {toggleSlider} = useSlider()

  const {createBank, updateBank} = useBankController()

  const [data, setData] = useState<IPayloadBank>({
    client_id: "",
    bank_name: "",
    mobile: "",
    contact_person_name: "",
    email: "",
    designation: "",
  })

  const [errState, setErrState] = useState(DEFAULT_ERR_STATE)

  const {bank_name, mobile, contact_person_name, email, designation} = data
  const {errBankName, errMobile, errContactPerson, errEmail, errDesignation} = errState

  const {mutate: onCreateBank} = useMutation({
    mutationKey: [QUERY_BANK],
    mutationFn: createBank,
    onSuccess: ({result, errorData}) => {
      if (result) {
        toggleSlider()
        toggleNotify({
          type: "success",
          title: "Create Bank",
          description: "Bank created successfully",
        })
        refreshQuery(QUERY_BANK)
      } else {
        toggleNotify({
          type: "error",
          title: "Bank not Created",
          description: errorData?.message || "Something went wrong",
        })
      }
    },
  })

  const {mutate: onUpdateBank} = useMutation({
    mutationKey: [QUERY_BANK_DETAIL],
    mutationFn: updateBank,
    onSuccess: ({result, errorData}) => {
      if (result) {
        toggleSlider()
        toggleNotify({
          type: "success",
          title: "Update Bank",
          description: "Bank updated successfully",
        })
        refetch()
      } else {
        toggleNotify({
          type: "error",
          title: "Bank not updated",
          description: errorData?.message || "Something went wrong",
        })
      }
    },
  })

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

    setErrState(errState)
    return errState
  }

  useEffect(() => {
    if (details) {
      setData(prev => ({
        ...prev,
        ...details,
      }))
    }
  }, [details])

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
      const updatedFields: Partial<IPayloadBank> = {}

      if (mobile !== details?.mobile) updatedFields.mobile = mobile
      if (designation !== details?.designation) updatedFields.designation = designation
      if (bank_name !== details?.bank_name) updatedFields.bank_name = bank_name
      if (contact_person_name !== details?.contact_person_name) updatedFields.contact_person_name = contact_person_name
      if (email !== details?.email) updatedFields.email = email

      if (details) {
        updatedFields.client_id = clientId

        if (Object.keys(updatedFields).length > 1) {
          onUpdateBank(updatedFields as IPayloadBank)
        } else {
          toggleNotify({
            type: "success",
            title: "No Changes",
            description: "No updates were made.",
          })
        }
      } else {
        const payload: IPayloadBank = {
          mobile,
          designation,
          bank_name,
          contact_person_name,
          email,
        }
        onCreateBank(payload)
      }
    }
  }

  return {
    formElements,
    onSubmit,
  }
}

export default useHandler

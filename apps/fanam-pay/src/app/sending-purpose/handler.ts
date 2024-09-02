import {useNotifyPopup} from "@fanam-pkg/core-ui-sass"
import {JSONObject} from "@fanam-pkg/core-utils"
import {useEffect, useState} from "react"
import {useMutation} from "@tanstack/react-query"
import {ITransactionPurpose} from "@custom/utils"
import {useTransactionController} from "controller"
import {useSingleton} from "hooks"
import {PURPOSES_BUSINESS, PURPOSES_INDIVIDUAL, QUERY_TRANSACTION} from "utils"

const DEFAULT_ERR_STATE = {
  errPurpose: "",
  errReason: "",
  errDoc: "",
  isClicked: false,
  isValid: false,
}

const useHandler = () => {
  const {transData} = useSingleton()
  const {toggleNotify} = useNotifyPopup()
  const {sendingPurpose} = useTransactionController()
  const {account_type} = transData?.recipient || {}
  const [data, setData] = useState<ITransactionPurpose>({
    purpose: null,
    reason: "",
    doc: null,
  })

  const {purpose, reason, doc} = data
  const [errState, setErrState] = useState(DEFAULT_ERR_STATE)

  const {isClicked} = errState

  const {mutate: onCreate} = useMutation({
    mutationKey: [QUERY_TRANSACTION],
    mutationFn: sendingPurpose,
    onSuccess: ({result, errorData}) => {
      if (result) {
        toggleNotify({
          title: "Success",
          description: "create Successfully",
          type: "success",
        })
      } else
        toggleNotify({
          title: "Error - Initiate transaction",
          description: errorData?.message || "Something went wrong",
          type: "error",
        })
    },
  })

  useEffect(() => {
    if (isClicked) setErrState(prev => ({...prev, ...onValidate()}))
  }, [data, isClicked])

  const onValidate = () => {
    let errState = {
      ...DEFAULT_ERR_STATE,
      isClicked: true,
      isValid: true,
    }
    errState = {...errState}

    if (!purpose) errState = {...errState, errPurpose: "Please choose valid purpose", isValid: false}

    if (!reason) errState = {...errState, errReason: "Please type your valid reason", isValid: false}

    if (!doc) errState = {...errState, errDoc: "Please choose valid reason", isValid: false}

    setErrState(errState)

    return errState
  }

  const onChangeValue = (value: JSONObject) => {
    setData(prev => ({...prev, ...value}))
  }

  const isIndividual = account_type?.find(({label, isSelected}) => isSelected && label === "Personal")

  const PURPOSES = isIndividual ? PURPOSES_INDIVIDUAL : PURPOSES_BUSINESS

  const onSubmit = () => {
    const errState = {...onValidate(), isClicked: true}
    const {isValid} = errState

    if (isValid) {
      onCreate({
        reason,
        purpose: purpose.key as string,
        doc: doc,
      })
    }
  }

  return {
    data,
    onChangeValue,
    PURPOSES,
    onSubmit,
    errState,
  }
}

export default useHandler

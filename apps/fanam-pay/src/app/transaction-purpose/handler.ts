import {useNotifyPopup} from "@fanam-pkg/core-ui-sass"
import {JSONObject} from "@fanam-pkg/core-utils"
import {useRouter} from "next/navigation"
import {useEffect, useState} from "react"
import {useMutation} from "@tanstack/react-query"
import {ITransactionPurpose} from "@custom/utils"
import {useTransactionController} from "controller"
import {useSingleton} from "hooks"
import {PURPOSES_BUSINESS, PURPOSES_INDIVIDUAL, QUERY_TRANSACTION, ROUTE_INITIATE_TRANSACTION} from "utils"

const DEFAULT_ERR_STATE = {
  errPurpose: "",
  errReason: "",
  errDoc: "",
  isClicked: false,
  isValid: false,
}

const useHandler = () => {
  const {push} = useRouter()
  const {transData} = useSingleton()
  const {toggleNotify} = useNotifyPopup()
  const {sendingPurpose, removeAttachment} = useTransactionController()
  const {recipient_account_type} = transData || {}
  const [data, setData] = useState<ITransactionPurpose>({
    purpose: null,
    reason: "",
    doc: [],
  })

  const {purpose, reason, doc} = data
  const [errState, setErrState] = useState(DEFAULT_ERR_STATE)

  const isIndividual = recipient_account_type === "Individual"
  const PURPOSES = isIndividual ? PURPOSES_INDIVIDUAL : PURPOSES_BUSINESS
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
        push(ROUTE_INITIATE_TRANSACTION)
      } else
        toggleNotify({
          title: "Error - Initiate transaction",
          description: errorData?.message || "Something went wrong",
          type: "error",
        })
    },
  })

  const {mutate: deleteFile} = useMutation({
    mutationKey: [QUERY_TRANSACTION],
    mutationFn: removeAttachment,
    onSuccess: ({result, errorData}, attachmentId) => {
      const {message} = errorData || {}
      const curData = {...data}
      curData.doc = curData.doc.filter(({attachment}) => attachment.id !== attachmentId)
      setData(curData)
      if (result) {
        toggleNotify({
          type: "success",
          title: "Removed attachment successfully",
        })
      } else {
        toggleNotify({
          type: "error",
          title: message || "Something went wrong",
        })
      }
    },
  })

  useEffect(() => {
    if (isClicked) setErrState(prev => ({...prev, ...onValidate()}))
  }, [data, isClicked])

  useEffect(() => {
    if (transData) {
      const {purpose, reason, invoice} = transData
      setData(prev => ({
        ...prev,
        purpose: PURPOSES.find(({key}) => key === purpose),
        reason,
        doc: invoice?.map(({url, attachment_id}) => ({
          attachment: {id: attachment_id, url},
          onClickRemove: deleteFile.bind(null, attachment_id),
        })),
      }))
    }
  }, [transData])

  const onValidate = () => {
    let errState = {
      ...DEFAULT_ERR_STATE,
      isClicked: true,
      isValid: true,
    }
    errState = {...errState}

    if (!purpose) errState = {...errState, errPurpose: "Please choose valid purpose", isValid: false}

    if (!reason) errState = {...errState, errReason: "Please type your valid reason", isValid: false}

    setErrState(errState)

    return errState
  }

  const onChangeValue = (value: JSONObject) => {
    setData(prev => ({...prev, ...value}))
  }

  const onSubmit = () => {
    const errState = {...onValidate(), isClicked: true}
    const {isValid} = errState

    if (isValid) {
      onCreate({
        reason,
        purpose: purpose.key as string,
        doc: doc?.filter(({file}) => !!file),
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

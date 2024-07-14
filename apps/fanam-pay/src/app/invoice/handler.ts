import {JSONObject} from "@fanam-pkg/core-utils"
import {useRouter} from "next/navigation"
import {useEffect, useState} from "react"
import {useMutation} from "@tanstack/react-query"
import {IInvoiceData} from "@custom/utils"
import {useTransactionController} from "controller"
import {QUERY_TRANSACTION, ROUTE_RECIPIENTS} from "utils"

export const useHandler = () => {
  const [data, setData] = useState<IInvoiceData>({invoice: []})
  const [errData, setErrData] = useState(DEFAULT_ERR_DATA)
  const {uploadInvoice} = useTransactionController()

  const {invoice} = data
  const {isClicked} = errData

  const {push} = useRouter()

  const onChangeValue = (value: JSONObject) => {
    setData(prev => ({...prev, ...value}))
  }

  const {data: invoiceRes, mutate: updateInvoice} = useMutation({
    mutationKey: [QUERY_TRANSACTION],
    mutationFn: uploadInvoice,
  })

  useEffect(() => {
    if (isClicked) setErrData(prev => ({...prev, ...onValidate()}))
  }, [data, isClicked])

  useEffect(() => {
    if (invoiceRes?.result) push(ROUTE_RECIPIENTS)
  }, [invoiceRes])

  const onValidate = () => {
    let errState = {
      ...DEFAULT_ERR_DATA,
      isValid: true,
      isClicked: true,
    }

    if (!invoice?.length) errState = {...errState, errInvoice: "Please choose valid Invoice documents", isValid: false}

    setErrData(errState)

    return errState
  }

  const onUpload = () => {
    const {isValid} = onValidate()

    if (isValid) {
      updateInvoice(invoice)
    }
  }

  return {
    onUpload,
    data,
    errData,
    onChangeValue,
  }
}

const DEFAULT_ERR_DATA = {
  isClicked: false,
  isValid: false,
  errInvoice: "",
}

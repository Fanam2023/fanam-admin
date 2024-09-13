"use client"

import {FormSectionProps, usePopup} from "@fanam-pkg/core-ui-sass"
import {JSONObject} from "@fanam-pkg/core-utils"
import {useState} from "react"
import {useMutation, useQuery} from "@tanstack/react-query"
import {StatusSelect} from "@custom/utils"
import {useTransactionController} from "controller"
import {TransactionDetails} from "organisms"
import {QUERY_TRANSACTION, TRANSACTION_STATUS} from "utils"

export const useHandler = () => {
  const {getTransaction, getTransactionDetails} = useTransactionController()
  const {togglePopup} = usePopup()
  const [data, setData] = useState<StatusSelect>({status: null})
  const {status} = data
  const statusKey = status?.key || ""

  const {data: transactions = []} = useQuery({
    queryKey: [QUERY_TRANSACTION.concat(statusKey)],
    queryFn: () => getTransaction(statusKey),
  })

  const {mutate: fetchTransaction} = useMutation({
    mutationFn: getTransactionDetails,
    onSuccess: transaction => {
      if (transaction)
        togglePopup({
          children: <TransactionDetails transaction={transaction} />,
        })
    },
  })

  const onChangeValue = (value: JSONObject) => setData(prev => ({...prev, ...value}))
  const formElements: FormSectionProps[] = [
    {
      childElements: [
        {
          elementType: "drop-down",
          options: TRANSACTION_STATUS,
          value: status,
          onChangeValue,
          name: "status",
        },
        {
          elementType: "input",
          type: "date",
          name: "date",
          onChangeValue,
        },
      ],
    },
  ]

  return {
    transactions,
    formElements,
    fetchTransaction,
  }
}

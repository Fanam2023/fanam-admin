"use client"

import {FormSectionProps, usePopup} from "@fanam-pkg/core-ui-sass"
import {IFormData, JSONObject} from "@fanam-pkg/core-utils"
import {useMemo, useState} from "react"
import {useMutation, useQuery} from "@tanstack/react-query"
import {IQueryTransaction, IStyle, TypeOrderStatus} from "@custom/utils"
import {useTransactionController} from "controller"
import {TransactionDetails} from "organisms"
import {QUERY_TRANSACTION, TRANSACTION_STATUS_OBJECT} from "utils"

export const useHandler = (styles: IStyle) => {
  const {getTransaction, getTransactionDetails} = useTransactionController()
  const {togglePopup} = usePopup()

  const formattedStatusOptions: IFormData<TypeOrderStatus | "">[] = useMemo(
    () => [
      {key: "", label: "All"},
      ...Object.keys(TRANSACTION_STATUS_OBJECT).map(key => ({
        key: key as TypeOrderStatus,
        label: TRANSACTION_STATUS_OBJECT[key]?.label,
      })),
    ],
    []
  )

  const [data, setData] = useState<IQueryTransaction>({
    status: formattedStatusOptions[0],
    date: "",
  })

  const {status, date} = data

  const {data: transactions = []} = useQuery({
    queryKey: [QUERY_TRANSACTION.concat(status.key)],
    queryFn: () => getTransaction(status.key),
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
      wrapperClassGrid: styles.filter_wrapper,
      childElements: [
        {
          elementType: "drop-down",
          options: formattedStatusOptions,
          name: "status",
          value: status,
          onChangeValue,
        },
        {
          elementType: "input",
          type: "date",
          value: date,
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

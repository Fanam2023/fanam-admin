"use client"

import {FormSectionProps, usePopup} from "@fanam-pkg/core-ui-sass"
import {useMutation, useQuery} from "@tanstack/react-query"
import {useTransactionController} from "controller"
import {TransactionDetails} from "organisms"
import {QUERY_TRANSACTION} from "utils/storage-constants"

export const useHandler = () => {
  const {getTransaction, getTransactionDetails} = useTransactionController()
  const {togglePopup} = usePopup()

  const {data: transactions = []} = useQuery({
    queryKey: [QUERY_TRANSACTION],
    queryFn: getTransaction,
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

  const formElements: FormSectionProps[] = [
    {
      childElements: [
        {
          elementType: "drop-down",
          label: "All",
        },
        {
          elementType: "date-picker",
          label: "Date",
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

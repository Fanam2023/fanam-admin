"use client"

import {FormSectionProps} from "@fanam-pkg/core-ui-sass"
import { useQuery } from "@tanstack/react-query"
import { useTransactionController } from "controller"
import {ITransactionDetails} from "model"
import { QUERY_TRANSACTION } from "utils/storage-constants"

export const useHandler = () => {
  const {getTransaction} = useTransactionController()

  const {data: transaction} = useQuery({
    queryKey: [QUERY_TRANSACTION],
    queryFn: getTransaction,
  })

  const defaultData: ITransactionDetails[] = [
    {
      month: "JUN",
      date: "19",
      name: "Phillip Levin",
      paymentId: "#1190538268",
      paymentMode: "Bank account",
      paymentDuration: "2-3 days",
      status: "Payment Sent",
      source_amount: " 10000 INR",
      destination_amount: "98 USD",
    },
  ]

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
    transaction,
    defaultData,
    formElements,
  }
}

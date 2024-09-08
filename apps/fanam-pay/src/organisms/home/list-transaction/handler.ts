"use client"

import {FormSectionProps} from "@fanam-pkg/core-ui-sass"
import {useQuery} from "@tanstack/react-query"
import {useTransactionController} from "controller"
import {QUERY_TRANSACTION} from "utils/storage-constants"

export const useHandler = () => {
  const {getTransaction} = useTransactionController()

  const {data: transaction} = useQuery({
    queryKey: [QUERY_TRANSACTION],
    queryFn: getTransaction,
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
    transaction,
    formElements,
  }
}

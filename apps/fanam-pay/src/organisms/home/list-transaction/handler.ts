"use client"

import {FormSectionProps} from "@fanam-pkg/core-ui-sass"
import {IDetail} from "model"

export const useHandler = () => {
  const defaultData: IDetail[] = [
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
    defaultData,
    formElements,
  }
}

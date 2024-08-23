"use client"

import {IDetail} from "model"

export const useHandler = () => {
  const defaultData: IDetail[] = [
    {
      month: "JUN",
      date: "19",
      name: "Phillip Levin",
      status: "Payment Sent",
      source_amount: " 10000 INR",
      destination_amount: "98 USD",
    },
  ]

  return {
    defaultData,
  }
}

"use client"

import {IExchange} from "model"

export const useHandler = () => {
  const defaultData: IExchange[] = [
    {
      destination_country: "USD",
      source_country: "INR",
      rate: "83.3156",
    },
    {
      destination_country: "EUR",
      source_country: "INR",
      rate: "83.3156",
    },
    {
      destination_country: "SGD",
      source_country: "INR",
      rate: "83.3156",
    },
    {
      destination_country: "AUD",
      source_country: "INR",
      rate: "83.3156",
    },
    {
      destination_country: "UAE",
      source_country: "INR",
      rate: "83.3156",
    },
  ]

  return {
    defaultData,
  }
}

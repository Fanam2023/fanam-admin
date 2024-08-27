import {IFormData} from "@fanam-pkg/core-utils"
import {useMemo} from "react"

export const useHandler = () => {
  const {recipientDetails} = useMemo(() => {
    const recipientDetails: IFormData[] = [
      {key: "First Name", label: "ram"},
      {key: "Last Name", label: "kumar"},
      {key: "Address", label: "45"},
      {key: "Email", label: "ram@gmail.com"},
      {key: "Phone Number", label: "458888545"},
      {key: "Country", label: "india"},
      {key: "State", label: "tamilnadu"},
      {key: "City", label: "tuticorin"},
      {key: "ZIP Code", label: "626367"},
      {key: "Account Number", label: "76376687899"},
    ]

    return {recipientDetails}
  }, [])

  return {recipientDetails}
}

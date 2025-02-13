"use client"

import {useRouter} from "next/navigation"
import {BankDetailProps} from "props"
import {ROUTE_BANK} from "utils"

export const useBankDetails = () => {
  const {push} = useRouter()

  const getBankDetails = (): BankDetailProps => ({
    breadcrumbValue: ["Bank", "Bank List"],
    bankName: "State Bank of India",
    mobile: "+91 89467 37865",
    contactPerson: "Justin Calzoni",
    email: "justincalzoni@gmail.com",
    altMobile: "+91 89467 34555",
    designation: "Marketing Manager",
    authMethod: "OAuth 3.0",
    authEndpoint: "justincalzoni@gmail.com",
    clientSecret: "Justin Calzoni",
    backgroundImage: "Bank logo.jpg",
    uploadedLogo: "Bank logo.jpg",
    primaryColor: "#D11B1B",
    secondaryColor: "#F20DA4",
    accentColor: "#1B23D1",
    font: "Poppins",
    customUrl: "www.poppinssdjdn.com",
    backgroundColor: "#DCAC26",
  })

  const handleBreadcrumb = () => {
    push(ROUTE_BANK)
  }

  return {getBankDetails, handleBreadcrumb}
}

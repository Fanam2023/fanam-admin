"use client"

import {useRouter} from "next/navigation"
import {ROUTE_BANK} from "utils"

export interface BankDetailProps {
  breadcrumbValue: any
  bankName: string
  mobile: string
  contactPerson: string
  email: string
  altMobile: string
  designation: string
  authMethod: string
  authEndpoint: string
  clientSecret: string
  backgroundImage: string
  uploadedLogo: string
  primaryColor: string
  secondaryColor: string
  accentColor: string
  font: string
  customUrl: string
  backgroundColor: string
}

export const getBankDetails = (): BankDetailProps => {
  return {
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
  }
}

export const handleBreadcrump = () => {
  const {push} = useRouter()
  push(ROUTE_BANK)
}

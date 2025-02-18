"use client"

import {useDialog, usePopup} from "@fanam-pkg/core-ui-sass"
import {useParams, useRouter} from "next/navigation"
import {useQuery} from "@tanstack/react-query"
import {useSlider} from "@custom/ui"
import {useBankController} from "controller"
import {useSingleton} from "hooks"
import {IPayloadBank} from "model"
import {CreateBankDetails} from "organisms"
import {BankDetailProps} from "props"
import {QUERY_BANK, ROUTE_BANK} from "utils"

export const useBankDetailsHandler = () => {
  const {signOutUser} = useSingleton()
  const {toggleDialog} = useDialog()
  const {togglePopup, closable} = usePopup()
  const {push} = useRouter()
  const {toggleSlider} = useSlider()
  const {getBank} = useBankController()
  const params = useParams()
  const id = params.client_id as string

  const {data: bankDetails} = useQuery({
    queryKey: [QUERY_BANK.concat(id)],
    queryFn: () => getBank(id),
    enabled: !!id,
  })

  const onUpdate = () => {
    if (!bankDetails?.result) return
    toggleSlider({
      children: <CreateBankDetails details={bankDetails?.result as IPayloadBank} />,
      title: "Update Bank",
    })
  }

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

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    const onConfirm = () => {
      push(ROUTE_BANK)
      toggleDialog()
    }

    const close = () => toggleDialog()

    toggleDialog({
      primaryButtonText: "Delete",
      secondaryButtonText: "Cancel",
      message: "Are you sure you want to delete?",
      onClickPrimary: onConfirm,
      onClickSecondary: close,
    })
  }

  return {
    getBankDetails,
    handleBreadcrumb,
    onUpdate,
    handleDeleteClick,
    togglePopup,
  }
}

"use client"

import {useDialog, usePopup} from "@fanam-pkg/core-ui-sass"
import {useParams, useRouter} from "next/navigation"
import {useQuery} from "@tanstack/react-query"
import {useSlider} from "@custom/ui"
import {useBankController} from "controller"
import {useSingleton} from "hooks"
import {CreateBankDetails} from "organisms"
import {QUERY_BANK, ROUTE_BANK} from "utils"

export const useBankDetailsHandler = () => {
  const {signOutUser} = useSingleton()
  const {toggleDialog} = useDialog()
  const {togglePopup, closable} = usePopup()
  const {push} = useRouter()
  const {toggleSlider} = useSlider()
  const {getBank} = useBankController()
  const params = useParams()
  const id = params?.client_id as string

  const {data: bankDetails, refetch} = useQuery({
    queryKey: [QUERY_BANK.concat(id)],
    queryFn: () => getBank(id),
    enabled: !!id,
  })

  const onUpdate = () => {
    if (!bankDetails?.result) return
    toggleSlider({
      children: <CreateBankDetails details={bankDetails?.result} refetch={refetch} clientId={id} />,
      title: "Update Bank",
    })
  }

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

  return {bankDetails, handleBreadcrumb, onUpdate, handleDeleteClick}
}

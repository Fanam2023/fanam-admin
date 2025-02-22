"use client"

import {useDialog, useNotifyPopup} from "@fanam-pkg/core-ui-sass"
import {useParams, useRouter} from "next/navigation"
import {useMutation, useQuery} from "@tanstack/react-query"
import {useSlider} from "@custom/ui"
import {useBankController} from "controller"
import {CreateBankDetails} from "organisms"
import {QUERY_BANK, ROUTE_BANK} from "utils"

export const useBankDetailsHandler = () => {
  const {toggleDialog} = useDialog()
  const {push} = useRouter()
  const {toggleSlider} = useSlider()
  const {getBank, removeBank} = useBankController()
  const {toggleNotify} = useNotifyPopup()
  const params = useParams()
  const id = params?.client_id as string

  const {data: bankDetails, refetch} = useQuery({
    queryKey: [QUERY_BANK.concat(id)],
    queryFn: () => getBank(id),
    enabled: !!id,
  })

  function onSuccess(title: string, description?: string) {
    toggleNotify({
      type: "success",
      title,
      description: description || title,
    })
  }

  function onFailure(message: string) {
    toggleNotify({
      type: "error",
      title: "Error",
      description: message,
    })
  }

  const {mutate: onBankDelete} = useMutation({
    mutationFn: removeBank,
    onSuccess: ({result, errorData}) => {
      if (result) {
        onSuccess("Bank Deleted Successfully", "Bank Deleted")
      } else {
        onFailure(errorData?.message || "Failed to delete")
      }
    },
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

  return {id, bankDetails, handleBreadcrumb, onUpdate, onBankDelete}
}

import {useResize} from "@fanam-pkg/core-utils"
import {useRouter} from "next/navigation"
import {useEffect, useState} from "react"
import {useMutation} from "@tanstack/react-query"
import {useSlider} from "@custom/ui"
import {useTransactionController} from "controller"
import {CreateRecipientDetails} from "organisms"
import {
  QUERY_TRANSACTION,
  ROUTE_BENEFICIARIES,
  ROUTE_RECIPIENTS,
  ROUTE_TRANSACTION,
  routeToRecipientDetails,
} from "utils"

export const useHandler = () => {
  const {push} = useRouter()
  const {toggleSlider} = useSlider()
  const {isDesktop} = useResize()
  const {syncRecipientAsBeneficiary} = useTransactionController()
  const [isSelected, setIsSelected] = useState(false)

  const onRouteToBeneficiary = () => push(ROUTE_BENEFICIARIES)

  const onBack = () => push(ROUTE_RECIPIENTS)
  const {mutate: linkRecipientAsBeneficiary, data: response} = useMutation({
    mutationKey: [QUERY_TRANSACTION],
    mutationFn: syncRecipientAsBeneficiary,
  })

  useEffect(() => {
    if (response) {
      if (isSelected) push(ROUTE_TRANSACTION)
      else push(ROUTE_BENEFICIARIES)
    }
  }, [response, isSelected])

  const onToggle = (recipient_id: string) => {
    if (isDesktop) {
      toggleSlider({
        children: <CreateRecipientDetails recipient_id={recipient_id} />,
        title: "Edit Recipient Details",
      })
    } else push(routeToRecipientDetails(recipient_id))
  }

  return {
    onRouteToBeneficiary,
    toggleSlider,
    isDesktop,
    onToggle,
    onBack,
    isSelected,
    setIsSelected,
  }
}

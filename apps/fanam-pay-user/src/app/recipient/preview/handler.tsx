import {useResize} from "@fanam-pkg/core-utils"
import {useRouter} from "next/navigation"
import {useSlider} from "@custom/ui"
import {CreateRecipientDetails} from "organisms"
import {ROUTE_BENEFICIARIES, routeToRecipientDetails} from "utils"

export const useHandler = () => {
  const {push} = useRouter()
  const {toggleSlider} = useSlider()
  const {isDesktop} = useResize()
  const onPayment = () => push(ROUTE_BENEFICIARIES)

  const onToggle = (recipient_id: string) => {
    if (isDesktop) {
      toggleSlider({
        children: <CreateRecipientDetails recipient_id={recipient_id} />,
        title: "Edit Recipient Details",
      })
    } else push(routeToRecipientDetails(recipient_id))
  }

  return {
    onPayment,
    toggleSlider,
    isDesktop,
    onToggle,
  }
}

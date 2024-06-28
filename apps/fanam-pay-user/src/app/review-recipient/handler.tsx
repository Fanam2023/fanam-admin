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

  const onToggle = (id: string) => {
    if (isDesktop) {
      toggleSlider({
        children: <CreateRecipientDetails title={"Edit Recipient Details"} />,
        title: "Edit Recipient Details",
      })
    }
    push(routeToRecipientDetails(id))
  }

  return {
    onPayment,
    toggleSlider,
    isDesktop,
    onToggle,
  }
}

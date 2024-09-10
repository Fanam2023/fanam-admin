import {useResize} from "@fanam-pkg/core-utils"
import {useRouter} from "next/navigation"
import {useSlider} from "@custom/ui"
import {CreateBeneficiaryDetails} from "organisms"
import {ROUTE_RECIPIENTS, ROUTE_TRANSACTION_PURPOSE, routeToRecipientDetails} from "utils"

export const useHandler = () => {
  const {push} = useRouter()
  const {toggleSlider} = useSlider()
  const {isDesktop} = useResize()

  const onRouteToPurpose = () => push(ROUTE_TRANSACTION_PURPOSE)

  const onBack = () => push(ROUTE_RECIPIENTS)

  const onToggle = (beneficiary_id: string) => {
    if (isDesktop) {
      toggleSlider({
        children: <CreateBeneficiaryDetails beneficiary_id={beneficiary_id} />,
        title: "Edit Beneficiary Details",
      })
    } else push(routeToRecipientDetails(beneficiary_id))
  }

  return {
    onRouteToPurpose,
    onToggle,
    onBack,
  }
}

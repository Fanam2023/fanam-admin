import {useResize} from "@fanam-pkg/core-utils"
import {useRouter} from "next/navigation"
import {useSlider} from "@custom/ui"
import {CreateBeneficiaryDetails} from "organisms"
import {ROUTE_BENEFICIARIES, ROUTE_RECIPIENTS, routeToRecipientDetails} from "utils"

export const useHandler = () => {
  const {push} = useRouter()
  const {toggleSlider} = useSlider()
  const {isDesktop} = useResize()

  const onRouteToBeneficiary = () => push(ROUTE_BENEFICIARIES)

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
    onRouteToBeneficiary,
    toggleSlider,
    isDesktop,
    onToggle,
    onBack,
  }
}

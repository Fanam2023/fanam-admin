import {useTranslation} from "react-i18next"
import {useRouter} from "next/navigation"
import {useSlider} from "@custom/ui"
import {CreateBeneficiaryDetails} from "organisms"
import {ROUTE_TRANSACTION_PURPOSE} from "utils"

export const useHandler = () => {
  const {push, back} = useRouter()
  const {toggleSlider} = useSlider()
  const {t} = useTranslation()

  const onRouteToPurpose = () => push(ROUTE_TRANSACTION_PURPOSE)

  const onBack = () => back()

  const onToggle = (beneficiary_id: string) => {
    toggleSlider({
      children: <CreateBeneficiaryDetails beneficiary_id={beneficiary_id} />,
      title: "Edit Beneficiary Details",
    })
  }

  return {
    onRouteToPurpose,
    onToggle,
    onBack,
    t,
  }
}

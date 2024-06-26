import {IBeneficiary} from "@custom/utils"

export interface BeneficiaryDetailsProps {
  isVisible?: boolean
  setIsVisible?: (show: boolean) => void
  title: string
  wrapperClass?: string
  onClickCreate?: (payload: IBeneficiary) => void
  beneficiaryDetails?: IBeneficiary
  onBack?: () => void
}

import {IBeneficiary} from "@custom/utils"

export interface BeneficiaryDetailsProps {
  onClickCreate?: (payload: IBeneficiary) => void
  beneficiaryDetails?: IBeneficiary
}

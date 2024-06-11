import {useMemo} from "react"

export const useBeneficiary = BENEFICIARY_LIST => {
  return useMemo(() => BENEFICIARY_LIST.map(({name, email}) => ({title: name, description: email})), [BENEFICIARY_LIST])
}

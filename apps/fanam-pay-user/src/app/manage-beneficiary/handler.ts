import {useRouter} from "next/navigation"
import {useMemo} from "react"
import {BENEFICIARY_LIST, ROUTE_ADD_BENEFICIARY} from "utils"

export const useBeneficiary = () => {
  const {push} = useRouter()
  const onNav = () => push(ROUTE_ADD_BENEFICIARY)

  const beneficiaries = useMemo(
    () => BENEFICIARY_LIST.map(({name, email}) => ({title: name, description: email})),
    [BENEFICIARY_LIST]
  )

  return {
    beneficiaries,
    onNav,
  }
}

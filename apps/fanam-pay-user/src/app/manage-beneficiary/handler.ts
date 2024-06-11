import {useRouter} from "next/router"
import {useMemo} from "react"
import {ROUTE_ADD_BENEFICIARY} from "utils"

export const useBeneficiary = BENEFICIARY_LIST => {
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

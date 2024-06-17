import {useRouter} from "next/navigation"
import {useMemo, useState} from "react"
import {BENEFICIARY_LIST, ROUTE_ADD_BENEFICIARY} from "utils"

export const useBeneficiaryHandler = () => {
  const {push} = useRouter()
  const onNav = () => push(ROUTE_ADD_BENEFICIARY)
  const [isSliderVisible, setIsSliderVisible] = useState(false)

  const beneficiaries = useMemo(
    () => BENEFICIARY_LIST.map(({name, email}) => ({title: name, description: email})),
    [BENEFICIARY_LIST]
  )

  return {
    beneficiaries,
    onNav,
    isSliderVisible,
    setIsSliderVisible,
  }
}

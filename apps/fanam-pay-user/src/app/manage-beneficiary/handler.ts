import {useRouter} from "next/navigation"
import {useMemo, useState} from "react"
import {BENEFICIARY_LIST, ROUTE_ADD_BENEFICIARY, ROUTE_PAYMENT} from "utils"

export const useHandler = () => {
  const {push} = useRouter()
  const [isSliderVisible, setIsSliderVisible] = useState(false)
  const onNav = () => push(ROUTE_ADD_BENEFICIARY)

  const onRouteToOptions = () => push(ROUTE_PAYMENT)

  const beneficiaries = useMemo(
    () => BENEFICIARY_LIST.map(({name, email}) => ({title: name, description: email})),
    [BENEFICIARY_LIST]
  )

  return {
    beneficiaries,
    onNav,
    isSliderVisible,
    setIsSliderVisible,
    onRouteToOptions,
  }
}

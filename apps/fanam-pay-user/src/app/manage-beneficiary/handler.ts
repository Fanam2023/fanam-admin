import {useRouter} from "next/navigation"
import {useMemo, useState} from "react"
import {useQuery} from "@tanstack/react-query"
import {useBeneficiaryController} from "controller"
import {QUERY_BENEFICIARY, ROUTE_ADD_BENEFICIARY, ROUTE_PAYMENT} from "utils"

export const useHandler = () => {
  const {push} = useRouter()
  const [isSliderVisible, setIsSliderVisible] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const {getAllBeneficiary} = useBeneficiaryController()

  const {data: beneficiaries} = useQuery({
    queryKey: [QUERY_BENEFICIARY],
    queryFn: getAllBeneficiary,
  })

  const onNav = () => push(ROUTE_ADD_BENEFICIARY)

  const onRouteToOptions = () => push(ROUTE_PAYMENT)

  const onChangeSearch = (value: string) => setSearchQuery(value)

  const beneficiaryList = useMemo(
    () =>
      beneficiaries
        ?.filter(({beneficiary_name}) => beneficiary_name.toLowerCase().includes(searchQuery.toLowerCase()))
        ?.map(({beneficiary_name, email}) => ({title: beneficiary_name, description: email})),
    [beneficiaries, searchQuery]
  )

  return {
    beneficiaryList,
    onNav,
    isSliderVisible,
    setIsSliderVisible,
    onRouteToOptions,
    onChangeSearch,
  }
}

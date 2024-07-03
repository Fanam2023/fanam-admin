import {useResize} from "@fanam-pkg/core-utils"
import {useRouter} from "next/navigation"
import {useMemo, useState} from "react"
import {useQuery} from "@tanstack/react-query"
import {useSlider} from "@custom/ui"
import {useBeneficiaryController} from "controller"
import {CreateBeneficiaryDetails} from "organisms"
import {QUERY_BENEFICIARY, ROUTE_ADD_BENEFICIARY, routeToBeneficiaryDetails} from "utils"

export const useHandler = () => {
  const {isDesktop} = useResize()
  const {push} = useRouter()
  const {toggleSlider} = useSlider()
  const [searchQuery, setSearchQuery] = useState("")
  const {getAllBeneficiary} = useBeneficiaryController()

  const {data: beneficiaries} = useQuery({
    queryKey: [QUERY_BENEFICIARY],
    queryFn: getAllBeneficiary,
  })

  const onNav = () => {
    if (isDesktop) {
      toggleSlider({
        children: <CreateBeneficiaryDetails />,
        title: "Add Beneficiary",
      })
    } else push(ROUTE_ADD_BENEFICIARY)
  }

  const filteredBeneficiaries = useMemo(() => {
    return beneficiaries?.filter(
      ({beneficiary_name, email}) =>
        beneficiary_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        email?.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [beneficiaries, searchQuery])

  const onChangeSearch = (value: string) => setSearchQuery(value)

  const routeToDetails = (beneficiaryId: string) => {
    if (isDesktop) {
      toggleSlider({
        children: <CreateBeneficiaryDetails beneficiary_id={beneficiaryId} />,
        title: "Edit Beneficiary",
      })
    } else {
      push(routeToBeneficiaryDetails(beneficiaryId))
    }
  }

  return {
    beneficiaries: filteredBeneficiaries,
    isDesktop,
    onNav,
    onChangeSearch,
    routeToDetails,
  }
}

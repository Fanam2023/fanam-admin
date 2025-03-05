import {useResize} from "@fanam-pkg/core-utils"
import {useTranslation} from "react-i18next"
import {useRouter} from "next/navigation"
import {useMemo, useState} from "react"
import {useMutation, useQuery} from "@tanstack/react-query"
import {useSlider} from "@custom/ui"
import {useBeneficiaryController, useTransactionController} from "controller"
import {CreateBeneficiaryDetails} from "organisms"
import {QUERY_BENEFICIARY, QUERY_TRANSACTION, ROUTE_BENEFICIARY_PREVIEW} from "utils"

export const useHandler = () => {
  const {isDesktop} = useResize()
  const {push, back} = useRouter()
  const {toggleSlider} = useSlider()
  const [searchQuery, setSearchQuery] = useState("")
  const {getAllBeneficiary} = useBeneficiaryController()
  const {syncBeneficiary} = useTransactionController()
  const {t} = useTranslation()

  const {mutate: linkBeneficiary} = useMutation({
    mutationKey: [QUERY_TRANSACTION],
    mutationFn: syncBeneficiary,
    onSuccess: ({result}) => {
      if (result) push(ROUTE_BENEFICIARY_PREVIEW)
    },
  })

  const onBack = () => back()

  const {data: beneficiaries} = useQuery({
    queryKey: [QUERY_BENEFICIARY],
    queryFn: getAllBeneficiary,
  })

  const onNav = () => {
    toggleSlider({
      children: <CreateBeneficiaryDetails />,
      title: t("Add Beneficiary"),
    })
  }

  const filteredBeneficiaries = useMemo(() => {
    return beneficiaries?.filter(
      ({first_name, email}) =>
        first_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        email?.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [beneficiaries, searchQuery])

  const onChangeSearch = (value: string) => setSearchQuery(value)

  const routeToDetails = (beneficiaryId: string) => {
    toggleSlider({
      children: <CreateBeneficiaryDetails beneficiary_id={beneficiaryId} />,
      title: t("Edit Beneficiary"),
    })
  }

  return {
    beneficiaries: filteredBeneficiaries,
    isDesktop,
    searchQuery,
    onNav,
    onChangeSearch,
    routeToDetails,
    onBack,
    linkBeneficiary,
    t,
  }
}

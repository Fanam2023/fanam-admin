import {useNotifyPopup} from "@fanam-pkg/core-ui-sass"
import {useReactQuery, useResize} from "@fanam-pkg/core-utils"
import {useRouter} from "next/navigation"
import {useState} from "react"
import {useMutation, useQuery} from "@tanstack/react-query"
import {IBeneficiary} from "@custom/utils"
import {useBeneficiaryController} from "controller"
import {QUERY_BENEFICIARY, ROUTE_ADD_BENEFICIARY, routeToBeneficiaryDetails} from "utils"

export const useHandler = () => {
  const {isDesktop} = useResize()
  const {push} = useRouter()
  const {toggleNotify} = useNotifyPopup()
  const {refreshQuery} = useReactQuery()
  const [isSliderVisible, setIsSliderVisible] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentBeneficiary, setCurrentBeneficiary] = useState(null)
  const {getAllBeneficiary, createBeneficiary, updateBeneficiary} = useBeneficiaryController()

  function onSuccess(message: string) {
    toggleNotify({
      type: "success",
      title: message,
      description: "Beneficiary added successfully",
    })
  }

  function onFailure(message: string) {
    toggleNotify({
      type: "error",
      title: message,
    })
  }

  const {data: beneficiaries} = useQuery({
    queryKey: [QUERY_BENEFICIARY],
    queryFn: getAllBeneficiary,
  })

  const {mutate} = useMutation({
    mutationKey: [QUERY_BENEFICIARY],
    mutationFn: createBeneficiary,
    onSuccess: ({result, errorData}) => {
      refreshQuery(QUERY_BENEFICIARY)
      if (result) onSuccess("Beneficiary Successfully created")
      else onFailure(errorData.message)
    },
  })

  const {mutate: updateApi} = useMutation({
    mutationKey: [QUERY_BENEFICIARY],
    mutationFn: updateBeneficiary,
    onSuccess: ({result, errorData}) => {
      refreshQuery(QUERY_BENEFICIARY)
      if (result) onSuccess("Beneficiary Successfully updated")
      else onFailure(errorData.message)
    },
  })

  const onChangeSearch = (value: string) => setSearchTerm(value)

  const filteredBeneficiaries = beneficiaries?.filter(
    beneficiary =>
      beneficiary.beneficiary_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      beneficiary.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const onEditBeneficiary = (beneficiary: IBeneficiary) => {
    setCurrentBeneficiary(beneficiary)
    setIsSliderVisible(true)
  }

  const routeToDetails = (beneficiaryId: string) => {
    const beneficiary = beneficiaries.find(b => b.beneficiary_id === beneficiaryId)
    if (isDesktop) {
      onEditBeneficiary(beneficiary)
    } else {
      push(routeToBeneficiaryDetails(beneficiaryId))
    }
  }

  const onNav = () => push(ROUTE_ADD_BENEFICIARY)

  return {
    onNav,
    isSliderVisible,
    setIsSliderVisible,
    mutate,
    beneficiaries: filteredBeneficiaries,
    onChangeSearch,
    currentBeneficiary,
    routeToDetails,
    updateApi,
  }
}

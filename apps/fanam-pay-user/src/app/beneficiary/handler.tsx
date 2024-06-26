import {useNotifyPopup} from "@fanam-pkg/core-ui-sass"
import {useReactQuery, useResize} from "@fanam-pkg/core-utils"
import {useRouter} from "next/navigation"
import {useMemo, useState} from "react"
import {useMutation, useQuery} from "@tanstack/react-query"
import {useSlider} from "@custom/ui"
import {useBeneficiaryController} from "controller"
import {CreateBeneficiaryDetails} from "organisms"
import {QUERY_BENEFICIARY, ROUTE_ADD_BENEFICIARY, routeToBeneficiaryDetails} from "utils"

export const useHandler = () => {
  const {isDesktop} = useResize()
  const {push} = useRouter()
  const {toggleNotify} = useNotifyPopup()
  const {refreshQuery} = useReactQuery()
  const {toggleSlider} = useSlider()
  const [searchTerm, setSearchTerm] = useState("")
  const [beneficiaryId, setBeneficiaryId] = useState<string | null>(null)
  const {getAllBeneficiary, createBeneficiary, updateBeneficiary, getByBeneficiaryId} = useBeneficiaryController()

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

  const {mutate: addBeneficiary} = useMutation({
    mutationKey: [QUERY_BENEFICIARY],
    mutationFn: createBeneficiary,
    onSuccess: ({result, errorData}) => {
      refreshQuery(QUERY_BENEFICIARY)
      if (result) onSuccess("Beneficiary Successfully updated")
      else onFailure(errorData.message)
    },
  })

  const {data: beneficiaries} = useQuery({
    queryKey: [QUERY_BENEFICIARY],
    queryFn: getAllBeneficiary,
  })

  const {mutate: onUpdate} = useMutation({
    mutationKey: [QUERY_BENEFICIARY],
    mutationFn: updateBeneficiary,
    onSuccess: ({result, errorData}) => {
      refreshQuery(QUERY_BENEFICIARY)
      if (result) onSuccess("Beneficiary Successfully updated")
      else onFailure(errorData.message)
    },
  })

  const {data: beneficiary} = useQuery({
    queryKey: [QUERY_BENEFICIARY],
    queryFn: () => getByBeneficiaryId(beneficiaryId as string),
  })

  const onNav = () => {
    if (isDesktop) {
      toggleSlider({
        children: <CreateBeneficiaryDetails onClickCreate={addBeneficiary} />,
        title: "Add Beneficiary",
      })
    } else push(ROUTE_ADD_BENEFICIARY)
  }

  const filteredBeneficiaries = useMemo(() => {
    return beneficiaries?.filter(
      ({beneficiary_name, email}) =>
        beneficiary_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        email.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [beneficiaries, searchTerm])

  const onChangeSearch = (value: string) => setSearchTerm(value)

  const routeToDetails = (beneficiaryId: string) => {
    setBeneficiaryId(beneficiaryId)
    if (isDesktop) {
      toggleSlider({
        children: (
          <CreateBeneficiaryDetails
            onClickCreate={payload => payload && onUpdate({...payload, beneficiary_id: beneficiaryId as string})}
            beneficiaryDetails={beneficiary}
          />
        ),
        title: "Add Beneficiary",
      })
    } else {
      push(routeToBeneficiaryDetails(beneficiaryId))
    }
  }

  return {
    beneficiaries: filteredBeneficiaries,
    isDesktop,
    onNav,
    addBeneficiary,
    onChangeSearch,
    routeToDetails,
  }
}

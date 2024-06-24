// import {useReactQuery} from "@fanam-pkg/core-utils"
// import {useRouter} from "next/navigation"
// import {useMemo, useState} from "react"
// import {useMutation, useQuery} from "@tanstack/react-query"
// import {useBeneficiaryController} from "controller"
// import {QUERY_BENEFICIARY, ROUTE_ADD_BENEFICIARY, ROUTE_PAYMENT} from "utils"

// export const useHandler = (onSuccess: (message: string) => void, onFailure: (message: string) => void) => {
//   const {push} = useRouter()
//   const [isSliderVisible, setIsSliderVisible] = useState(false)
//   const [searchQuery, setSearchQuery] = useState("")
//   const {getAllBeneficiary, createBeneficiary} = useBeneficiaryController()
//   const {refreshQuery} = useReactQuery()

//   const {data: beneficiaries} = useQuery({
//     queryKey: [QUERY_BENEFICIARY],
//     queryFn: getAllBeneficiary,
//   })

//   const {mutate} = useMutation({
//     mutationKey: [QUERY_BENEFICIARY],
//     mutationFn: createBeneficiary,
//     onSuccess: ({result, errorData}) => {
//       refreshQuery(QUERY_BENEFICIARY)
//       if (result) onSuccess("Beneficiary Successfully created")
//       else onFailure(errorData.message)
//     },
//   })

//   const onNav = () => push(ROUTE_ADD_BENEFICIARY)

//   const onRouteToOptions = () => push(ROUTE_PAYMENT)

//   const onChangeSearch = (value: string) => setSearchQuery(value)

//   const beneficiaryList = useMemo(
//     () =>
//       beneficiaries
//         ?.filter(({beneficiary_name}) => beneficiary_name.toLowerCase().includes(searchQuery.toLowerCase()))
//         ?.map(({beneficiary_name, email}) => ({title: beneficiary_name, description: email})),
//     [beneficiaries, searchQuery]
//   )

//   return {
//     beneficiaryList,
//     onNav,
//     isSliderVisible,
//     setIsSliderVisible,
//     onRouteToOptions,
//     onChangeSearch,
//     mutate,
//   }
// }

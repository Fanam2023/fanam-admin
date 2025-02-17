"use client"

import {useParams, useRouter} from "next/navigation"
import {useQuery} from "@tanstack/react-query"
import {useSlider} from "@custom/ui"
import {useBankController} from "controller"
import {CreateBankDetails} from "organisms"
import {QUERY_BANK, ROUTE_BANK} from "utils"

export const useBankDetailsHandler = () => {
  const {push} = useRouter()
  const {toggleSlider} = useSlider()
  const {getBank} = useBankController()
  const params = useParams()
  const id = params.client_id as string

  const {data: bankDetails, refetch} = useQuery({
    queryKey: [QUERY_BANK.concat(id)],
    queryFn: () => getBank(id),
    enabled: !!id,
  })

  const onUpdate = () => {
    if (!bankDetails?.result) return
    toggleSlider({
      children: <CreateBankDetails details={bankDetails?.result} refetch={refetch} />,
      title: "Update Bank",
    })
  }

  const handleBreadcrumb = () => {
    push(ROUTE_BANK)
  }

  return {bankDetails, handleBreadcrumb, onUpdate}
}

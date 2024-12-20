import {useSearchParams} from "next/navigation"
import {useEffect} from "react"
import {useMutation, useQuery} from "@tanstack/react-query"
import {useHomeController} from "controller"

const useHandler = () => {
  const {getClientId, getClientToken} = useHomeController()
  const searchParams = useSearchParams()

  useEffect(() => {
    const authCode = searchParams.get("authCode")
    const state = searchParams.get("state")
    if (authCode && state) {
      mutate({
        bank_name: "Hdfc_bank",
        bankcode_string: authCode,
      })
    }
  }, [])

  const {mutate} = useMutation({
    mutationKey: ["bank-token"],
    mutationFn: getClientToken,
  })

  const {data: clientInfo, refetch: refetchClient} = useQuery({
    queryKey: ["bank"],
    queryFn: () => getClientId("Hdfc_bank"),
    enabled: false,
  })

  return {
    clientInfo,
    refetchClient,
  }
}

export default useHandler

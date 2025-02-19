import {useNotifyPopup} from "@fanam-pkg/core-ui-sass"
import {useRouter} from "next/navigation"
import {useMutation} from "@tanstack/react-query"
import {useInititeSessionController} from "controller"

const useHandler = () => {
  const {initiateSession} = useInititeSessionController()
  const {toggleNotify} = useNotifyPopup()
  const {push} = useRouter()

  const {mutate} = useMutation({
    mutationFn: initiateSession,
    onSuccess: ({result, errorData}) => {
      if (result) {
        const {web_url, session_id} = result || {}
        toggleNotify({
          type: "success",
          title: "Create Bank",
          description: "Bank created successfully",
        })
        push(web_url)
      } else {
        toggleNotify({
          type: "error",
          title: "Bank not Created",
          description: errorData?.message || "Something went wrong",
        })
      }
    },
  })

  const onSubmit = () => {
    let payload = {
      api_key: "834c7b93-789f-4f5e-921a-05c13d5e0576",
    }
    mutate(payload)
  }

  return {
    onSubmit,
  }
}

export default useHandler

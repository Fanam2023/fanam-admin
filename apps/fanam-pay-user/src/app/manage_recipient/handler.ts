import {useRouter} from "next/navigation"
import {useMemo} from "react"
import {RECIPIENT_LIST, ROUTE_ADD_RECEPIENT} from "utils"

export const useRecipient = () => {
  const {push} = useRouter()
  const onNav = () => push(ROUTE_ADD_RECEPIENT)

  const recipients = useMemo(
    () => RECIPIENT_LIST.map(({name, accountNumber}) => ({title: name, description: accountNumber})),
    [RECIPIENT_LIST]
  )

  return {
    recipients,
    onNav,
  }
}

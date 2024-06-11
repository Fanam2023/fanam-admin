import {useRouter} from "next/router"
import {useMemo} from "react"
import {ROUTE_ADD_RECEPIENT} from "utils"

export const useRecipient = RECIPIENT_LIST => {
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

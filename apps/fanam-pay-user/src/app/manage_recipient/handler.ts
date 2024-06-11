import {useMemo} from "react"

export const useRecipient = RECIPIENT_LIST => {
  const recipients = useMemo(
    () => RECIPIENT_LIST.map(({name, accountNumber}) => ({title: name, description: accountNumber})),
    [RECIPIENT_LIST]
  )

  return recipients
}

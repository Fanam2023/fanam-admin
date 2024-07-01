"use client"

import {CreateRecipientDetails} from "organisms"
import {useHandler} from "./handler"

const RecipientDetails = () => {
  const {recipient, onUpdate, recipientId} = useHandler()
  return (
    <CreateRecipientDetails
      onClickCreate={payload => payload && onUpdate({...payload, recipient_id: recipientId as string})}
      recipient={recipient}
    />
  )
}

export default RecipientDetails

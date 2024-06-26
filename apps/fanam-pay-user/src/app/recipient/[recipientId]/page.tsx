"use client"

import {CreateRecipientDetails} from "organisms"
import {useHandler} from "./handler"

const RecipientDetails = () => {
  const {recipient, onUpdate, recipientId} = useHandler()
  return (
    <CreateRecipientDetails
      title={"Add Recipient Details"}
      onClickCreate={payload => payload && onUpdate({...payload, recipient_id: recipientId as string})}
      recipientDetails={recipient}
    />
  )
}

export default RecipientDetails

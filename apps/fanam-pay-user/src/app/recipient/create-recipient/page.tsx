"use client"

import {CreateRecipientDetails} from "organisms"
import {useHandler} from "./handler"

const CreateRecipient = () => {
  const {mutate} = useHandler()

  return <CreateRecipientDetails title={"Add Recipient Details"} onClickCreate={mutate} />
}

export default CreateRecipient

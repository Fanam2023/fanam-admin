"use client"

import {CreateRecipientDetails} from "organisms"
import {useHandler} from "./handler"

const CreateRecipient = () => {
  const {mutate} = useHandler()

  return <CreateRecipientDetails onClickCreate={mutate} />
}

export default CreateRecipient

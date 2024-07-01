"use client"

import {CreateRecipientDetails} from "organisms"
import {useHandler} from "./handler"

const CreateRecipient = () => {
  const {addRecipient} = useHandler()

  return <CreateRecipientDetails onClickCreate={addRecipient} />
}

export default CreateRecipient

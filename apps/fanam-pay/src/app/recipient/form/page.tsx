"use client"

import {useSearchParams} from "next/navigation"
import {CreateRecipientDetails} from "organisms"

const RecipientForm = () => {
  const searchParams = useSearchParams()

  return <CreateRecipientDetails recipient_id={searchParams.get("recipientId")} />
}

export default RecipientForm

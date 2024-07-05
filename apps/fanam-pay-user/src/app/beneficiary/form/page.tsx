"use client"

import {useSearchParams} from "next/navigation"
import {CreateBeneficiaryDetails} from "organisms"

const BeneficiaryForm = () => {
  const searchParams = useSearchParams()

  return <CreateBeneficiaryDetails beneficiary_id={searchParams.get("beneficiaryId")} />
}

export default BeneficiaryForm

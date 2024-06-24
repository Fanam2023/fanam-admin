"use client"

import {useParams, useRouter} from "next/navigation"
import {CreateBeneficiaryDetails} from "organisms"
import {ROUTE_BENEFICIARIES} from "utils"
import {useHandler} from "./handler"

const BeneficiaryDetail = () => {
  const {beneficiaryId} = useParams()
  const {push} = useRouter()
  const {mutate, beneficiaryDetails} = useHandler(
    message => console.log(message),
    message => console.log(message),
    beneficiaryId as string
  )

  const goToBack = () => {
    push(ROUTE_BENEFICIARIES)
  }

  return (
    <CreateBeneficiaryDetails
      title="Add Beneficiary Details"
      onClickCreate={payload => payload && mutate({...payload, beneficiary_id: beneficiaryId as string})}
      beneficiaryDetails={beneficiaryDetails}
      onBack={goToBack}
    />
  )
}

export default BeneficiaryDetail

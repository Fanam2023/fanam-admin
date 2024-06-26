"use client"

import {CreateBeneficiaryDetails} from "organisms"
import {useHandler} from "./handler"

const BeneficiaryDetail = () => {
  const {onUpdate, beneficiary, beneficiaryId} = useHandler()

  return (
    <CreateBeneficiaryDetails
      onClickCreate={payload => payload && onUpdate({...payload, beneficiary_id: beneficiaryId as string})}
      beneficiaryDetails={beneficiary}
    />
  )
}

export default BeneficiaryDetail

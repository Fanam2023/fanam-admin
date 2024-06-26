"use client"

import {CreateBeneficiaryDetails} from "organisms"
import {useHandler} from "./handler"

const BeneficiaryDetail = () => {
  const {onUpdate, beneficiary, onBack, beneficiaryId} = useHandler()

  return (
    <CreateBeneficiaryDetails
      title={"Add Beneficiary Details"}
      onClickCreate={payload => payload && onUpdate({...payload, beneficiary_id: beneficiaryId as string})}
      beneficiaryDetails={beneficiary}
      onBack={onBack}
    />
  )
}

export default BeneficiaryDetail

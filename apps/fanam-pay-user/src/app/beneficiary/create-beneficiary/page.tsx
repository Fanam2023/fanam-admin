"use client"

import {CreateBeneficiaryDetails} from "organisms"
import {useHandler} from "./handler"

const CreateBeneficiary = () => {
  const {mutate} = useHandler()

  return <CreateBeneficiaryDetails title={"Add Beneficiary Details"} onClickCreate={mutate} />
}

export default CreateBeneficiary

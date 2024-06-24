"use client"

import {CreateBeneficiaryDetails} from "organisms"
import {useHandler} from "./handler"

const CreateBeneficiary = () => {
  const {addBeneficiary} = useHandler(
    message => console.log(message),
    message => console.log(message)
  )

  return <CreateBeneficiaryDetails title="Add Beneficiary Details" onClickCreate={addBeneficiary} />
}

export default CreateBeneficiary

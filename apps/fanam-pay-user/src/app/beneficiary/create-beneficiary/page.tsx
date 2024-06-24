"use client"

import {CreateBeneficiaryDetails} from "organisms"
import {useHandler} from "./handler"

const CreateBeneficiary = () => {
  const {mutate} = useHandler(
    message => console.log(message),
    message => console.log(message)
  )

  return <CreateBeneficiaryDetails title={"Add Beneficiary Details"} onClickCreate={mutate} />
}

export default CreateBeneficiary

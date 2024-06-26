"use client"

import {CreateBeneficiaryDetails} from "organisms"
import {useHandler} from "./handler"

const CreateBeneficiary = () => {
  const {addBeneficiary} = useHandler()

  return <CreateBeneficiaryDetails onClickCreate={addBeneficiary} />
}

export default CreateBeneficiary

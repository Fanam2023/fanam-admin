"use client"

import {FormSectionProps, GroupForm} from "@fanam-pkg/core-ui-sass"
import {BaseContainer} from "organisms"
import styles from "./beneficiary.module.sass"
import useBeneficiary from "./handler"

const BenificiaryDetail = () => {
  const {errState, onChangeValue, data, onSubmit} = useBeneficiary(
    message => console.log(message),
    message => console.log(message)
  )

  const {errName, errEmail, errNumber, errRelation} = errState

  const formElements: FormSectionProps[] = [
    {
      childElements: [
        {
          elementType: "input",
          label: "Enter Benificiary Name",
          name: "name",
          error: errName,
          onChangeValue,
        },
        {
          elementType: "input",
          label: "Enter E-Mail ID",
          name: "email",
          error: errEmail,
          onChangeValue,
        },
        {
          elementType: "input",
          label: "Enter Phone Number",
          name: "number",
          error: errNumber,
          onChangeValue,
        },
        {
          elementType: "input",
          label: "Enter Relationship with Sender",
          name: "relation",
          error: errRelation,
          onChangeValue,
        },
      ],
    },
  ]

  return (
    <BaseContainer buttonText="Continue" header="Benificiary Details">
      <GroupForm formSections={formElements} wrapperClass={styles.input_wrapper} />
    </BaseContainer>
  )
}

export default BenificiaryDetail

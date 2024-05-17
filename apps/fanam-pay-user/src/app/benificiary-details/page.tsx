"use client"

import {Button, FormSectionProps, GroupForm, ImageView, assets} from "@fanam-pkg/core-ui-sass"
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
    <section>
      <section className={`flex ${styles.header_wrapper}`}>
        <ImageView className={styles.icon} src={assets.ic_black_arrow} alt="" imgSize={24} />
        <h5 className={styles.tittle_wrapper}>Benificiary Details</h5>
      </section>
      <GroupForm formSections={formElements} wrapperClass={styles.input_wrapper} />
      <Button onClick={onSubmit} wrapperClass={styles.button_wrapper}>
        Submit
      </Button>
    </section>
  )
}

export default BenificiaryDetail

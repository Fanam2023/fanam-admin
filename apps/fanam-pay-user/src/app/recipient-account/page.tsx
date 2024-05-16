"use client"

import {Button, FormSectionProps, GroupForm, ImageView, assets} from "@fanam-pkg/core-ui-sass"
import useReciptentDetails from "./handler"
import styles from "./recipient.module.sass"

const RecipientAccountDetail = () => {
  const {errState, onChangeValue, data, onSubmit} = useReciptentDetails(
    message => console.log(message),
    message => console.log(message)
  )

  const {
    errName,
    errAcNumber,
    errAddress,
    errBankName,
    errBranch,
    errConfirmAc,
    errIBANNumber,
    errRoutingcode,
    errSwiftCode,
  } = errState

  const formElements: FormSectionProps[] = [
    {
      childElements: [
        {
          elementType: "input",
          label: "Enter Account Holder Name",
          name: "name",
          error: errName,
          onChangeValue,
        },
        {
          elementType: "input",
          label: "Enter Account Number",
          name: "email",
          error: errAcNumber,
          onChangeValue,
        },
        {
          elementType: "input",
          label: "Confirm Account Number",
          name: "account_number",
          error: errConfirmAc,
          onChangeValue,
        },
        {
          elementType: "input",
          label: "Enter IBAN Number",
          name: "iban_number",
          error: errIBANNumber,
          onChangeValue,
        },
        {
          elementType: "input",
          label: "Enter Swift Code",
          name: "swift_code",
          error: errSwiftCode,
          onChangeValue,
        },
        {
          elementType: "input",
          label: "Enter Routing Code",
          name: "routing_code",
          error: errRoutingcode,
          onChangeValue,
        },
        {
          elementType: "input",
          label: "Enter Recipient Address",
          name: "recipient_address",
          error: errAddress,
          onChangeValue,
        },
        {
          elementType: "input",
          label: "Enter Bank Name",
          name: "bank_name",
          error: errBankName,
          onChangeValue,
        },
        {
          elementType: "input",
          label: "Enter Branch Address",
          name: "Branch_address",
          error: errBranch,
          onChangeValue,
        },
      ],
    },
  ]

  return (
    <section>
      <section className={`flex ${styles.header_wrapper}`}>
        <ImageView className={styles.icon} src={assets.ic_black_arrow} alt="" imgSize={24} />
        <h5 className={styles.tittle_wrapper}>Reciptent Account Details</h5>
      </section>
      <GroupForm formSections={formElements} wrapperClass={styles.input_wrapper} />
      <Button onClick={onSubmit} wrapperClass={styles.button_wrapper}>
        Continue
      </Button>
    </section>
  )
}

export default RecipientAccountDetail

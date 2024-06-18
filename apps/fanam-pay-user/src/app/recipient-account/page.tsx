"use client"

import {FormSectionProps, GroupForm} from "@fanam-pkg/core-ui-sass"
import {BaseContainer} from "organisms"
import {useHandler} from "./handler"
import styles from "./recipient.module.sass"

const RecipientAccountDetail = () => {
  const {errState, onChangeValue, data, onSubmit} = useHandler(
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
    <BaseContainer buttonText="Continue" header="Reciptent Account Details">
      <GroupForm formSections={formElements} wrapperClass={styles.input_wrapper} />
    </BaseContainer>
  )
}

export default RecipientAccountDetail

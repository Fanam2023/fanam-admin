"use client"

import {FormSectionProps, GroupForm} from "@fanam-pkg/core-ui-sass"
import {useResize} from "@fanam-pkg/core-utils"
import {BaseContainer} from "organisms"
import styles from "./beneficiary.module.sass"
import {useHandler} from "./handler"

const BenificiaryDetail = () => {
  const {isDesktop} = useResize()
  const {errState, onChangeValue, data, onSubmit} = useHandler(
    message => console.log(message),
    message => console.log(message)
  )

  const {errName, errEmail, errNumber, errRelation, errAddress, errCountryName, errStateName, errCity, errZipCode} =
    errState

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
        {
          elementType: "input",
          label: "Enter Benificiary Address",
          name: "address",
          error: errAddress,
          onChangeValue,
        },
        {
          elementType: "input",
          label: "Enter Country",
          name: "country_name",
          error: errCountryName,
          onChangeValue,
        },
        {
          elementType: "input",
          label: "Enter State",
          name: "state_name",
          error: errStateName,
          onChangeValue,
        },
        {
          elementType: "input",
          label: "Enter City/District",
          name: "city/district",
          error: errCity,
          onChangeValue,
        },
        {
          elementType: "input",
          label: "Enter Zip Code",
          name: "zip_code",
          error: errZipCode,
          onChangeValue,
        },
      ],
    },
  ]

  return (
    <section>
      {isDesktop ? (
        <GroupForm formSections={formElements} wrapperClass={styles.input_wrapper} />
      ) : (
        <BaseContainer buttonText="Submit" header="Reciptent Details" onClick={onSubmit} backIcon>
          <GroupForm formSections={formElements} wrapperClass={styles.input_wrapper} />
        </BaseContainer>
      )}
    </section>
  )
}

export default BenificiaryDetail

"use client"

import {FormSectionProps, GroupForm} from "@fanam-pkg/core-ui-sass"
import {useResize} from "@fanam-pkg/core-utils"
import {BaseContainer} from "organisms"
import {useHandler} from "./handler"
import styles from "./page.module.sass"

const RecipientDetail = () => {
  const {isDesktop} = useResize()
  const {errState, onChangeValue, onAdd, data, onSubmit} = useHandler(
    message => console.log(message),
    message => console.log(message)
  )

  const {errName, errCountryName, errCity, errEmail, errPhone, errPincode, errStateName} = errState

  const formElements: FormSectionProps[] = [
    {
      childElements: [
        {
          elementType: "input",
          label: "Enter Recipient Name",
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
          name: "phone_number",
          error: errPhone,
          onChangeValue,
        },
        {
          elementType: "drop-down",
          label: "Enter Country Name",
          name: "country_name",
          error: errCountryName,
          onChangeValue,
        },
        {
          elementType: "drop-down",
          label: "Enter State Name",
          name: "state_name",
          error: errStateName,
          onChangeValue,
        },
        {
          elementType: "drop-down",
          label: "Enter City/District Name",
          name: "state_name",
          error: errCity,
          onChangeValue,
        },
        {
          elementType: "input",
          label: "Enter Zip/Postal code",
          name: "zip",
          error: errPincode,
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
        <BaseContainer buttonText="Submit" header="Reciptent Details" onClick={onAdd} backIcon>
          <GroupForm formSections={formElements} wrapperClass={styles.input_wrapper} />
        </BaseContainer>
      )}
    </section>
  )
}

export default RecipientDetail

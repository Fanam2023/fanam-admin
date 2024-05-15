"use client"

import {Button, FormSectionProps, GroupForm, ImageView, assets} from "@fanam-pkg/core-ui-sass"
import useCreateReciptent from "./handler"
import styles from "./page.module.sass"

const RecipientDetail = () => {
  const {errState, onChangeData, data, onSubmit} = useCreateReciptent(
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
          onChangeValue: onChangeData,
        },
        {
          elementType: "input",
          label: "Enter E-Mail ID",
          name: "email",
          error: errEmail,
          onChangeValue: onChangeData,
        },
        {
          elementType: "input",
          label: "Enter Phone Number",
          name: "phone_number",
          error: errPhone,
          onChangeValue: onChangeData,
        },
        {
          elementType: "drop-down",
          label: "Enter Country Name",
          name: "country_name",
          error: errCountryName,
          onChangeValue: onChangeData,
        },
        {
          elementType: "drop-down",
          label: "Enter State Name",
          name: "state_name",
          error: errStateName,
          onChangeValue: onChangeData,
        },
        {
          elementType: "drop-down",
          label: "Enter City/District Name",
          name: "state_name",
          error: errCity,
          onChangeValue: onChangeData,
        },
        {
          elementType: "input",
          label: "Enter Zip/Postal code",
          name: "zip",
          error: errPincode,
          onChangeValue: onChangeData,
        },
      ],
    },
  ]

  return (
    <section>
      <section className={`flex ${styles.header_wrapper}`}>
        <ImageView className={styles.icon} src={assets.ic_black_arrow} alt="" imgSize={24} />
        <h5 className={styles.tittle_wrapper}>Reciptent Details</h5>
      </section>
      <GroupForm formSections={formElements} wrapperClass={styles.input_wrapper} />
      <Button onClick={onSubmit} wrapperClass={styles.button_wrapper}>
        Submit
      </Button>
    </section>
  )
}

export default RecipientDetail

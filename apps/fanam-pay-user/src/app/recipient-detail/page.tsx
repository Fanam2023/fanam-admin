"use client"

import {FormSectionProps, GroupForm, ImageView, assets} from "@fanam-pkg/core-ui-sass"
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
          onChange: e => onChangeData({name: e.target.value}),
        },
        {
          elementType: "input",
          label: "Enter E-Mail ID",
          name: "email",
          error: errEmail,
          onChange: e => onChangeData({email: e.target.value}),
        },
        {
          elementType: "input",
          label: "Enter Phone Number",
          name: "phone_number",
          error: errPhone,
          onChange: e => onChangeData({phone: e.target.value}),
        },
        {
          elementType: "drop-down",
          label: "Enter Country Name",
          name: "country_name",
          error: errCountryName,
          onChange: e => onChangeData({country_name: e.target.value}),
        },
        {
          elementType: "drop-down",
          label: "Enter State Name",
          name: "state_name",
          error: errStateName,
          onChange: e => onChangeData({state: e.target.value}),
        },
        {
          elementType: "drop-down",
          label: "Enter City/District Name",
          name: "state_name",
          error: errCity,
          onChange: e => onChangeData({city: e.target.value}),
        },
        {
          elementType: "input",
          label: "Enter Zip/Postal code",
          name: "zip",
          error: errPincode,
          onChange: e => onChangeData({pincode: e.target.value}),
        },
      ],
    },
  ]

  return (
    <section>
      <form className={`flex ${styles.header_wrapper}`}>
        <ImageView className={styles.icon} src={assets.ic_black_arrow} alt="" imgSize={24} />
        <h5 className={styles.tittle_wrapper}>Reciptent Details</h5>
      </form>
      <form className={styles.input_wrapper}>
        <GroupForm formSections={formElements} />
      </form>
      <button onClick={onSubmit} className={styles.button_wrapper}>
        Submit
      </button>
    </section>
  )
}

export default RecipientDetail

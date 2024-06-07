"use client"

import {DropDown, ImageView, RadioButton, TextField} from "@fanam-pkg/core-ui-sass"
import assets from "assets"
import {BaseContainer} from "organisms"
import styles from "./page.module.sass"

const HomePage = () => {
  return (
    <BaseContainer header="Cross Border Remittance" buttonText="Confirm">
      <section className={styles.container_wrapper}>
        <h4>Select recipient type</h4>
        <section className={`flex ${styles.button_container}`}>
          <RadioButton />
          <RadioButton />
        </section>
        <DropDown
          options={["dfjd", "dfdj"]}
          wrapperClass={styles.drop_down_wrapper}
          label={"Purpose of Sending Money"}
        />
        <h4 className={styles.conversion_text}>Conversion Estimate</h4>
        <section className={styles.conversion_container}>
          <section className={`flex-col ${styles.container}`}>
            <section>
              <h4>You Send</h4>
              <section className={`flex ${styles.input_container}`}>
                <ImageView src={assets.ic_india_flag} alt="country_flag" imgSize={40} />
                <h4>INR</h4>
                <TextField wrapperClass={styles.text_field_wrapper} />
              </section>
            </section>
            <section>
              <h4>Recipient receives</h4>
              <section className={`flex ${styles.input_container}`}>
                <ImageView src={assets.ic_us_flag} alt="country_flag" imgSize={40} />
                <h4>USD</h4>
                <TextField wrapperClass={styles.text_field_wrapper} />
              </section>
            </section>
          </section>
        </section>
      </section>
    </BaseContainer>
  )
}
export default HomePage

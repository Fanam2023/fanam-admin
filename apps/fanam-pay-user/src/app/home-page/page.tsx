"use client"

import {DropDown, ImageView, TextField} from "@fanam-pkg/core-ui-sass"
import assets from "assets"
import {RadioToggle} from "organisms"
import styles from "./page.module.sass"

const HomePage = () => {
  return (
    <section>
      <section className={`flex ${styles.title_container}`}>
        <h3>Cross Border Remittance</h3>
      </section>
      <section className={styles.container_wrapper}>
        <h4>Select recipient type</h4>
        <section className={`flex ${styles.button_container}`}>
          <RadioToggle label={"Business"} />
          <RadioToggle label={"Individual"} />
        </section>
        <DropDown
          options={["dfjd", "dfdj"]}
          onChangeData={() => undefined}
          wrapperClass={styles.drop_down_wrapper}
          label={"Purpose of Sending Money"}
        />
        <h4 className={styles.conversion_text}>Conversion Estimate</h4>
        <section className={styles.conversion_container}>
          <section className={`flex-col ${styles.container}`}>
            <section>
              <h4>You Send</h4>
              <section className={`flex ${styles.input_container}`}>
                <ImageView src={assets.ic_delete} alt="country_flag" imgSize={40} />
                <h4>INR</h4>
                <TextField wrapperClass={styles.text_field_wrapper} />
              </section>
            </section>
            <section>
              <h4>Recipient receives</h4>
              <section className={`flex ${styles.input_container}`}>
                <ImageView src={assets.ic_delete} alt="country_flag" imgSize={40} />
                <h4>USD</h4>
                <TextField wrapperClass={styles.text_field_wrapper} />
              </section>
            </section>
          </section>
        </section>
      </section>
    </section>
  )
}
export default HomePage

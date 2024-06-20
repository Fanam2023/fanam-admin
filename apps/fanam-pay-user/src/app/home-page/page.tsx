"use client"

import {DropDown, ImageView, RadioButton, TextField} from "@fanam-pkg/core-ui-sass"
import assets from "assets"
import {BaseContainer} from "organisms"
import {useHandler} from "./handler"
import styles from "./page.module.sass"

const HomePage = () => {
  const {onAdd, recipientType, onSelectRecipientType, senderType, onSelectSenderType} = useHandler()

  return (
    <BaseContainer
      header="Cross Border Remittance"
      buttonText="Confirm"
      onClick={onAdd}
      childWrapper={styles.page_container}
      backIcon={false}
      stepIndex={0}>
      <section className={styles.container_wrapper}>
        <section className={`flex-col ${styles.button_container}`}>
          <h4 className="semi-bold">Sender type</h4>
          <RadioButton
            items={senderType}
            onSelectItems={onSelectSenderType}
            wrapperClass={styles.radio_button}
            radioGroupName="senderTypeGroup"
          />
        </section>
        <section className={`flex-col ${styles.button_container}`}>
          <h4 className="semi-bold"> Recipient type</h4>
          <RadioButton
            items={recipientType}
            onSelectItems={onSelectRecipientType}
            wrapperClass={styles.radio_button}
            radioGroupName="recipientTypeGroup"
          />
        </section>
        <h4 className="semi-bold">Purpose of sending money</h4>
        <DropDown
          options={["dfjd", "dfdj"]}
          wrapperClass={styles.drop_down_wrapper}
          label={"Purpose of Sending Money"}
        />
        <h4 className={`semi-bold ${styles.conversion_text}`}>Conversion Estimate</h4>
        <section className={styles.conversion_container}>
          <h5 className={`bold ${styles.send_text}`}>You Send</h5>
          <section className={`flex ${styles.input_container}`}>
            <section className={`flex ${styles.flag_wrapper}`}>
              <ImageView src={assets.ic_india_flag} alt="country_flag" imgSize={40} />
              <h3 className={styles.currency_text}>INR</h3>
              <ImageView src={assets.ic_grey_arrow} alt="down-arrow" imgSize={15} />
            </section>
            <TextField wrapperClass={styles.text_field_wrapper} />
          </section>
          <h5 className={`bold ${styles.recipient_text}`}>Recipient receives</h5>
          <section className={`flex ${styles.input_container}`}>
            <section className={`flex ${styles.flag_wrapper} ${styles.usd_wrapper}`}>
              <ImageView src={assets.ic_us_flag} alt="country_flag" imgSize={40} />
              <h3 className={styles.receiver_text}>USD</h3>
              <ImageView src={assets.ic_grey_arrow} alt="down-arrow" imgSize={15} />
            </section>
            <TextField wrapperClass={styles.text_field_wrapper} />
          </section>
        </section>
      </section>
    </BaseContainer>
  )
}

export default HomePage

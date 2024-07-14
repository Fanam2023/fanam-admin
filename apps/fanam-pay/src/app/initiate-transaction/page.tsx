"use client"

import {DropDown, ImageView, RadioButton, TextArea, TextField} from "@fanam-pkg/core-ui-sass"
import assets from "assets"
import {BaseContainer} from "organisms"
import {useHandler} from "./handler"
import styles from "./page.module.sass"

const InitiateTransactionPage = () => {
  const {data, showCountries, PURPOSES, onChangeValue, onSelectType, onSubmit, sourceCountry} = useHandler()

  const {source_amount, destination_amount, recipient_account_type, destination_country, purpose, reason} = data

  return (
    <BaseContainer
      header="Cross Border Remittance"
      buttonText="Confirm"
      onSubmit={onSubmit}
      childWrapper={styles.page_container}
      backIcon={false}
      stepIndex={1}>
      <section className={styles.container_wrapper}>
        <section className={`flex-col ${styles.button_container}`}>
          <h4 className="semi-bold">Account type</h4>
          <RadioButton
            items={recipient_account_type}
            onSelectItems={onSelectType}
            wrapperClass={styles.radio_button}
            name="recipient_account_type"
          />
        </section>
        <h4 className="semi-bold">Purpose of sending money</h4>
        <DropDown
          options={PURPOSES}
          wrapperClass={styles.drop_down_wrapper}
          label="Purpose of Sending Money"
          selected={purpose}
          name="purpose"
          onChangeData={onChangeValue}
        />
        <section className={styles.text_area_wrapper}>
          <TextArea
            wrapperClass={styles.text_area_wrapper}
            label="Brief purpose of payment"
            value={reason}
            name="reason"
            onChangeData={onChangeValue}
          />
        </section>
        <h4 className={`semi-bold ${styles.conversion_text}`}>Conversion Estimate</h4>
        <section className={styles.conversion_container}>
          <h5 className={`bold ${styles.send_text}`}>You Send</h5>
          <section className={`flex ${styles.input_container}`}>
            <section className={`flex ${styles.flag_wrapper} ${styles.sender_wrapper}`}>
              <ImageView src={assets.ic_india_flag} alt="country_flag" imgSize={40} />
              <h3 className={styles.currency_text}>{sourceCountry?.iso2}</h3>
            </section>
            <ImageView src={assets.ic_grey_arrow} alt="down-arrow" imgSize={15} />
            <TextField
              wrapperClass={styles.text_field_wrapper}
              value={source_amount}
              name="source_amount"
              onChangeData={onChangeValue}
            />
          </section>
          <h5 className={`bold ${styles.recipient_text}`}>Recipient receives</h5>
          <section className={`flex ${styles.input_container}`}>
            <section className={`flex ${styles.flag_wrapper} `}>
              <label style={{width: "40px", height: "40px"}}>{destination_country?.emoji}</label>
              <h3 className={styles.currency_text}>{destination_country?.iso2}</h3>
            </section>
            <ImageView src={assets.ic_grey_arrow} alt="down-arrow" onClick={showCountries} imgSize={15} />
            <TextField
              wrapperClass={styles.text_field_wrapper}
              value={destination_amount}
              name="destination_amount"
              onChangeData={onChangeValue}
            />
          </section>
        </section>
      </section>
    </BaseContainer>
  )
}

export default InitiateTransactionPage

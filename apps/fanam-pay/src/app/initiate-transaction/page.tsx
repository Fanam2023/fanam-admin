"use client"

import {ImageView} from "@fanam-pkg/core-ui-sass"
import assets from "assets"
import {BaseContainer, CountryFlag} from "organisms"
import {TransferTime} from "../../organisms/transfer-time"
import {useHandler} from "./handler"
import styles from "./page.module.sass"

const InitiateTransactionPage = () => {
  const {
    data: {source_amount, destination_amount, destination_country, source_country},
    onChangeValue,
    onSubmit,
    onSelect,
    fxRes,
    showCountries,
    transfer_time,
  } = useHandler()

  const {sla_timing_min, sla_timing_max} = transfer_time || {}

  const {currency} = destination_country || {}

  return (
    <BaseContainer
      header="Cross Border Remittance"
      buttonText="Confirm"
      skipBtn="Back"
      onSubmit={onSubmit}
      childWrapper={styles.page_container}
      isStepper
      backIcon={false}
      stepIndex={3}>
      <section className={styles.container_wrapper}>
        <section className={styles.header_wrapper}>
          <h2 className="bold">Payout Estimate</h2>
          <h5 className={styles.description}>
            Estimated value for converting your money from one currency to another based on the current exchange rates.
          </h5>
        </section>
        <section className={styles.conversion_container}>
          <section className={`flex-sb-center ${styles.currency_wrapper}`}>
            <section className={styles.sender_wrapper}>
              <h5 className={`bold ${styles.txt_wrapper}`}>You Send</h5>
              <section className={`flex-sb-center ${styles.conversion_wrapper}`}>
                <input
                  type="text"
                  value={source_amount}
                  className={styles.input}
                  name="source_amount"
                  // onChange={onChangeValue}
                />
                <section className={`flex ${styles.currency}`}>
                  <CountryFlag {...source_country} />
                </section>
              </section>
            </section>
            <ImageView src={assets.ic_conversion} alt="convert" imgSize={40} wrapperClass={styles.convert_img} />
            <section>
              <h5 className={`bold ${styles.recipient_txt}`}>Recipient receives</h5>
              <section className={`flex-sb-center ${styles.conversion_wrapper}`}>
                <section className={styles.amount}>
                  <input
                    type="text"
                    value={destination_amount}
                    name="destination_amount"
                    className={styles.input}
                    onChange={onChangeValue}
                  />
                </section>
                <section className={`flex ${styles.currency}`} onClick={showCountries}>
                  <CountryFlag {...destination_country} />
                  <ImageView src={assets.ic_dropDown} alt={"Drop-Down"} imgSize={12} />
                </section>
              </section>
            </section>
          </section>
          <TransferTime onSelect={onSelect} transferTimeRes={fxRes} />
          <section className={`flex-sb-center ${styles.total_background}`}>
            <section className={styles.receiver_wrapper}>
              <h4>Receiver will get exactly</h4>
              <section className="flex">
                <ImageView src={assets.ic_power} alt="" imgSize={24} />
                <h5 className={styles.hour_wrapper}>
                  Transfer in
                  {sla_timing_min !== sla_timing_max
                    ? `${sla_timing_min} - ${sla_timing_max} hours`
                    : `${sla_timing_min} hours`}
                </h5>
              </section>
            </section>
            <h4 className={`bold ${styles.total_wrapper}`}>
              {destination_amount} {currency}
            </h4>
          </section>
        </section>
      </section>
    </BaseContainer>
  )
}

export default InitiateTransactionPage

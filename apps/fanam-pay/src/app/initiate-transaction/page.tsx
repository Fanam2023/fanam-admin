"use client"

import {BaseContainer, CountryFlag} from "organisms"
import {useHandler} from "./handler"
import styles from "./page.module.sass"
import {Transfer} from "./transfer-time"

const InitiateTransactionPage = () => {
  const {
    data: {source_amount, destination_amount, destination_country, source_country},
    onChangeValue,
    onSubmit,
    handleSelect,
    selectedTime,
  } = useHandler()

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
          <h2 className="bold">Payment Estimate</h2>
          <h5>
            Estimated value for converting your money from one currency to another based on the current exchange rates.
          </h5>
        </section>
        <section className={styles.conversion_container}>
          <section className={`flex-sb-center ${styles.currency_wrapper}`}>
            <section className={styles.sender_wrapper}>
              <h5 className={`bold ${styles.txt_wrapper}`}>You send</h5>
              <section className={`flex-sb-center ${styles.conversion_wrapper}`}>
                <section className={styles.amount}>
                  <input
                    type="text"
                    value={source_amount}
                    className={styles.input}
                    name="source_amount"
                    onChange={onChangeValue}
                  />
                </section>
                <section className={`flex ${styles.currency}`}>
                  <CountryFlag {...source_country} />
                </section>
              </section>
            </section>
            <section>
              <h5 className={`bold ${styles.txt_wrapper}`}>Recipient recieves</h5>
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
                <section className={`flex ${styles.currency}`}>
                  <CountryFlag {...destination_country} />
                </section>
              </section>
            </section>
          </section>
          <Transfer onSelectChargeAndTime={handleSelect} />
          <section className={`flex-sb-center ${styles.exchange_wrapper}`}>
            <h5>Exchange rate</h5>
            <h5>250.00 INR</h5>
          </section>
          <section className={`flex-sb-center ${styles.exchange_wrapper}`}>
            <h5>Total fees</h5>
            <h5>351.00 INR</h5>
          </section>
          <section className={styles.line_wrapper} />
          <section className={`flex-sb-center`}>
            <section className={styles.receiver_wrapper}>
              <h4>Receiver will get exactly</h4>
              <h5 className={styles.hour_wrapper}>Transfer in {selectedTime}</h5>
            </section>
            <h4 className={`bold ${styles.total_wrapper}`}>98.28 USD</h4>
          </section>
        </section>
      </section>
    </BaseContainer>
  )
}

export default InitiateTransactionPage

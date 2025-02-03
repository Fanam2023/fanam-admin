"use client"

import {ImageView} from "@fanam-pkg/core-ui-sass"
import assets from "assets"
import {BrowserBackNavigation} from "atoms"
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
    onDisable,
    durationTime,
    onCancel,
    t,
  } = useHandler()

  const {sla_timing_min, sla_timing_max} = transfer_time || {}

  const {currency: destination_currency} = destination_country || {}
  const {currency: source_currency} = source_country || {}

  return (
    <BaseContainer
      header="Cross Border Remittance"
      buttonText="Confirm"
      disabled={onDisable(destination_amount)}
      onSubmit={onSubmit}
      cancelBtn="Cancel Payment"
      onCancel={onCancel}
      childWrapper={styles.page_container}
      isStepper
      backIcon={false}
      stepIndex={3}>
      <BrowserBackNavigation />
      <section className={styles.container_wrapper}>
        <section className={styles.header_wrapper}>
          <h2 className={`bold ${styles.title}`}>{t("Payout Estimate")}</h2>
          <h5 className={styles.description}>
            {t(
              "Estimated value for converting your money from one currency to another based on the current exchange rates."
            )}
          </h5>
        </section>
        <section className={styles.conversion_container}>
          {!!durationTime && !!transfer_time && destination_amount !== "0" && destination_amount.trim() !== "" && (
            <section className={`flex ${styles.duration_wrapper}`}>
              <ImageView src={assets.ic_alarm} imgSize={24} alt="alarm" />
              <p>Important Note: Session becomes invalid at timer’s expiration</p>
              <h4 className={styles.duration_time}> {durationTime}</h4>
            </section>
          )}
          <section className={`flex-sb-center ${styles.currency_wrapper}`}>
            <section className={styles.sender_wrapper} aria-readonly="true">
              <h5 className={`bold ${styles.txt_wrapper}`}>{t("You Send")}</h5>
              <section className={`flex-sb-center ${styles.conversion_wrapper}`}>
                <input
                  type="text"
                  value={source_amount}
                  className={styles.input}
                  name="source_amount"
                  disabled
                  readOnly
                />
                <section className={`flex ${styles.currency}`}>
                  <section className={`flex ${styles.flag_container} ${styles.sender_wrapper}`}>
                    <CountryFlag countryCode={source_country?.iso2} wrapperClass={styles.flag} />
                    <h3 className={styles.currency_text}>{source_currency}</h3>
                  </section>
                </section>
              </section>
            </section>
            <ImageView src={assets.ic_conversion} alt="convert" imgSize={40} wrapperClass={styles.convert_img} />
            <section className={styles.recipient_wrapper}>
              <h5 className={`bold ${styles.recipient_txt}`}>{t("Recipient receives")}</h5>
              <section className={`flex-sb-center ${styles.conversion_wrapper}`} aria-readonly="true">
                <section className={styles.amount}>
                  <input
                    type="text"
                    value={destination_amount}
                    name="destination_amount"
                    className={styles.input2}
                    onChange={onChangeValue}
                  />
                </section>
                <section className={`flex ${styles.currency}`} onClick={showCountries}>
                  <section className={`flex ${styles.flag_container} ${styles.sender_wrapper}`}>
                    <CountryFlag countryCode={destination_country?.iso2} wrapperClass={styles.flag} />
                    <h3 className={styles.currency_text}>{destination_currency}</h3>
                  </section>
                  <ImageView src={assets.ic_dropDown} alt="Drop-Down" imgSize={12} />
                </section>
              </section>
            </section>
          </section>
          {!!destination_amount && destination_amount !== "0" && (
            <TransferTime onSelect={onSelect} transferTimeRes={fxRes} />
          )}
          {destination_amount && destination_amount !== "0" && (
            <section className={`flex-sb-center ${styles.total_background}`}>
              <section className={styles.receiver_wrapper}>
                <h5>{t("Receiver will get exactly")}</h5>
                <section className="flex">
                  <ImageView src={assets.ic_power} alt="" imgSize={24} />
                  <h5 className={styles.hour_wrapper}>
                    Transfer in{" "}
                    {sla_timing_min !== sla_timing_max
                      ? `${sla_timing_min} - ${sla_timing_max} hours`
                      : `${sla_timing_min} hours`}
                  </h5>
                </section>
              </section>
              <h4 className={`bold ${styles.total_wrapper}`}>
                {parseFloat(destination_amount)?.toFixed(2)} {destination_currency}
              </h4>
            </section>
          )}
        </section>
      </section>
    </BaseContainer>
  )
}

export default InitiateTransactionPage

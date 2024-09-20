"use client"

import {ImageView} from "@fanam-pkg/core-ui-sass"
import {IFormData} from "@fanam-pkg/core-utils"
import assets from "assets"
import {BaseContainer} from "organisms"
import useHandler from "./handler"
import styles from "./page.module.sass"

const ReviewAndSend = () => {
  const {
    beneficiaryDetails,
    recipientDetails,
    paymentDetails,
    showDetails,
    toggleDetails,
    destination_amount,
    destinationCountryValue,
    isDisabled,
    transactionId,
    completeTransaction,
    durationTime,
    transfer_time,
  } = useHandler()

  const {recipient, beneficiary} = showDetails

  const renderPaymentDetails = ({label, key}: IFormData) => {
    return (
      <section className={`flex-sb-center ${styles.payment_wrapper}`}>
        <h6 className={styles.title_text}>{key}</h6>
        <h6 className={styles.detail}>{label}</h6>
      </section>
    )
  }

  return (
    <BaseContainer
      buttonText="Send money"
      skipBtn="Back"
      isStepper
      disabled={isDisabled}
      onSubmit={completeTransaction.bind(null, transactionId)}
      childWrapper={styles.page_wrapper}
      stepIndex={4}>
      <section className={`flex-col ${styles.heading_wrapper}`}>
        <h4 className={`bold ${styles.title}`}>Review and Send</h4>
        <p className={styles.description}>Review the details of the recipient details and their account details.</p>
      </section>
      <section className={styles.card_wrapper}>
        {!!durationTime && !!transfer_time && (
          <section className={`flex ${styles.duration_wrapper}`}>
            <ImageView src={assets.ic_alarm} imgSize={24} alt="alarm" />
            <p>Your session will end when the timer reaches</p>
            <h4 className={styles.duration_time}> {durationTime}</h4>
          </section>
        )}
        <section className={`flex-sb-center ${styles.header}`}>
          <h5 className={styles.edit_text}>Conversion Details</h5>
        </section>
        <ul>{paymentDetails?.map(renderPaymentDetails)}</ul>
        <section className={`flex-sb-center`}>
          <h5 className={styles.amount_title}>Receiver will get exactly</h5>
          <h5 className={`bold ${styles.amount}`}>
            {`${destination_amount}  
            ${destinationCountryValue}`}
          </h5>
        </section>
        <section className={styles.separator}></section>
        <section className={`flex-sb-center ${styles.header}`}>
          <h5 className={styles.edit_text}>Recipient Details</h5>
        </section>
        <ul>{(recipient ? recipientDetails : recipientDetails?.slice(0, 4))?.map(renderPaymentDetails)}</ul>
        <h6 className={`bold ${styles.amount}`} onClick={() => toggleDetails("recipient")}>
          {recipient ? "See less" : "See more"}
        </h6>
        <section className={styles.separator}></section>
        <section className={`flex-sb-center ${styles.header}`}>
          <h5 className={styles.edit_text}>Beneficiary Details</h5>
        </section>
        <ul>{(beneficiary ? beneficiaryDetails : beneficiaryDetails?.slice(0, 4))?.map(renderPaymentDetails)}</ul>
        <h6 className={`bold ${styles.amount}`} onClick={() => toggleDetails("beneficiary")}>
          {beneficiary ? "See less" : "See more"}
        </h6>
      </section>
    </BaseContainer>
  )
}

export default ReviewAndSend

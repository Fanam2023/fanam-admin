"use client"

import {ImageView} from "@fanam-pkg/core-ui-sass"
import {IFormData, useResize} from "@fanam-pkg/core-utils"
import assets from "assets"
import {BaseContainer} from "organisms"
import useHandler from "./handler"
import styles from "./page.module.sass"

const ReviewAndSend = () => {
  const {
    recipient_id,
    beneficiaryDetails,
    recipientDetails,
    paymentDetails,
    showDetails,
    toggleDetails,
    routeToBeneficiary,
    routeToRecipient,
    onProcessPayment,
    transId,
    destination_amount,
    destinationCountryValue,
  } = useHandler()

  const {recipient, beneficiary} = showDetails
  const {isDesktop} = useResize()

  const renderPaymentDetails = ({label, key}: IFormData) => {
    return (
      <section className={`flex-sb-center ${styles.payment_wrapper}`}>
        <h6 className={styles.title_text}>{key}</h6>
        <h6>{label}</h6>
      </section>
    )
  }

  return (
    <BaseContainer
      buttonText="Send money"
      skipBtn="Back"
      onSubmit={onProcessPayment.bind(null, transId)}
      childWrapper={styles.page_wrapper}>
      <section className={`flex-col ${styles.heading_wrapper}`}>
        <h4 className="bold">Review and Send</h4>
        <p>Review the details of the recipient details and their account details.</p>
      </section>
      <section className={styles.card_wrapper}>
        <section className={`flex-sb-center ${styles.header}`}>
          <h5 className={styles.edit_text}>Conversation Details</h5>
          <section className="flex">
            {isDesktop ? (
              <>
                <ImageView wrapperClass={styles.edit_icon} src={assets.ic_edit_white} alt="edit-icon" imgSize={20} />
                <h5 className={styles.edit_text}>Edit</h5>
              </>
            ) : (
              <ImageView src={assets.ic_more} alt="edit-icon" imgSize={20} />
            )}
          </section>
        </section>
        <ul>{paymentDetails?.map(renderPaymentDetails)}</ul>
        <section className={`flex-sb-center`}>
          <h5 className={styles.amount_title}>Receiver will get exactly</h5>
          <h5 className={`bold ${styles.amount}`}>
            {destination_amount}
            {destinationCountryValue}
          </h5>
        </section>
        <section className={styles.separator}></section>
        <section className={`flex-sb-center ${styles.header}`}>
          <h5 className={styles.edit_text}>Recipient Details</h5>
          <section className="flex">
            {isDesktop ? (
              <>
                <ImageView
                  wrapperClass={styles.edit_icon}
                  src={assets.ic_edit_white}
                  alt="edit-icon"
                  imgSize={20}
                  onClick={() => routeToRecipient(recipient_id)}
                />
                <h5 className={styles.edit_text}>Edit</h5>
              </>
            ) : (
              <ImageView
                src={assets.ic_more}
                alt="edit-icon"
                wrapperClass={styles.edit_icon}
                imgSize={20}
                onClick={() => routeToRecipient(recipient_id)}
              />
            )}
          </section>
        </section>
        <ul>{(recipient ? recipientDetails : recipientDetails?.slice(0, 4))?.map(renderPaymentDetails)}</ul>
        <h6 className={`bold ${styles.amount}`} onClick={() => toggleDetails("recipient")}>
          {recipient ? "See less" : "See more"}
        </h6>
        <section className={styles.separator}></section>
        <section className={`flex-sb-center ${styles.header}`}>
          <h5 className={styles.edit_text}>Beneficiary Details</h5>
          <section className="flex">
            {isDesktop ? (
              <>
                <ImageView
                  wrapperClass={styles.edit_icon}
                  src={assets.ic_edit_white}
                  alt="edit-icon"
                  imgSize={20}
                  onClick={() => routeToBeneficiary("beneficiary_id")}
                />
                <h5 className={styles.edit_text}>Edit</h5>
              </>
            ) : (
              <ImageView
                src={assets.ic_more}
                alt="edit-icon"
                wrapperClass={styles.edit_icon}
                imgSize={20}
                onClick={() => routeToBeneficiary("beneficiary_id")}
              />
            )}
          </section>
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

"use client"

import {Button, ImageView} from "@fanam-pkg/core-ui-sass"
import asset from "assets"
import {RecepiantAccountProps, RecepiantProps} from "props"
import {ACCOUNTDETAILS, RECIPIENTDETAILS} from "utils"
import styles from "./review.module.sass"

const ReviewDetails = () => {
  const renderRecipentDetails = ({name, data}: RecepiantProps, index: number) => (
    <section className={`flex-sb-center ${styles.data_wrapper}`}>
      <h5 className={styles.field_wrapper}>{name}</h5>
      <h5 className={styles.field_wrapper}>{data}</h5>
    </section>
  )
  const renderAccountDetails = ({name, data}: RecepiantAccountProps, index: number) => (
    <section className={`flex-sb-center ${styles.data_wrapper}`}>
      <h5 className={styles.field_wrapper}>{name}</h5>
      <h5 className={styles.field_wrapper}>{data}</h5>
    </section>
  )

  return (
    <section>
      <section className={`flex`}>
        <ImageView className={styles.icon} src={asset.ic_back} alt="" imgSize={24} />
        <h5 className={styles.header_wrapper}>Review Recipient Details</h5>
      </section>
      <section className={styles.border_wrapper}>
        <section className={`flex-sb-center ${styles.card_wrapper}`}>
          <h5 className={styles.tittle_wrapper}>Recipient Details</h5>
          <ImageView className={styles.edit_icon} src={asset.ic_edit} alt="" imgSize={24} />
        </section>
        <section>{RECIPIENTDETAILS.map(renderRecipentDetails)}</section>
      </section>
      <section className={styles.border_wrapper}>
        <section className={`flex-sb-center ${styles.card_wrapper}`}>
          <h5 className={styles.tittle_wrapper}>Recipient Account Details</h5>
          <ImageView className={styles.edit_icon} src={asset.ic_edit} alt="" imgSize={24} />
        </section>
        <section>{ACCOUNTDETAILS.map(renderAccountDetails)}</section>
      </section>
      <section className={`flex`}>
        <ImageView className={styles.check_icon} src={asset.ic_checkbox} alt="" imgSize={24} />
        <h5 className={styles.detail_wrapper}>Are the recipient and benificiary same</h5>
      </section>
      <Button wrapperClass={styles.button_wrapper}>Confirm</Button>
    </section>
  )
}

export default ReviewDetails

"use client"

import {ImageView} from "@fanam-pkg/core-ui-sass"
import assets from "assets"
import {BaseContainer} from "organisms"
import {useReviewRecipientHandler} from "./handler"
import RecipientCard from "./recipient-card/page"
import styles from "./review.module.sass"

const ReviewDetails = () => {
  const {onPayment} = useReviewRecipientHandler()

  return (
    <BaseContainer
      header="Review Recipient Details"
      buttonText="Confirm"
      onClick={onPayment}
      childWrapper={styles.page_wrapper}>
      <section className={`flex-col-center`}>
        <RecipientCard />
        <section className={`flex ${styles.check_box_wrapper}`}>
          <ImageView wrapperClass={styles.check_icon} src={assets.ic_checkbox} alt="" imgSize={24} />
          <h5 className={styles.detail_wrapper}>Are the recipient and benificiary same</h5>
        </section>
      </section>
    </BaseContainer>
  )
}

export default ReviewDetails

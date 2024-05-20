"use client"

import {Button, ImageView} from "@fanam-pkg/core-ui-sass"
import assets from "assets"
import RecipientCard from "./recipient-card/page"
import styles from "./review.module.sass"

const ReviewDetails = () => (
  <section>
    <section className={`flex`}>
      <ImageView className={styles.icon} src={assets.ic_back} alt="" imgSize={24} />
      <h2 className={styles.header_wrapper}>Review Recipient Details</h2>
    </section>
    <RecipientCard />
    <section className={`flex`}>
      <ImageView className={styles.check_icon} src={assets.ic_checkbox} alt="" imgSize={24} />
      <h5 className={styles.detail_wrapper}>Are the recipient and benificiary same</h5>
    </section>
    <Button wrapperClass={styles.button_wrapper}>Confirm</Button>
  </section>
)

export default ReviewDetails

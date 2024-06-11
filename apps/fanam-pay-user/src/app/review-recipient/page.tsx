"use client"

import {ImageView} from "@fanam-pkg/core-ui-sass"
import {useRouter} from "next/navigation"
import assets from "assets"
import {BaseContainer} from "organisms"
import {ROUTE_PAYMENT} from "utils"
import RecipientCard from "./recipient-card/page"
import styles from "./review.module.sass"

const ReviewDetails = () => {
  const {push} = useRouter()
  const onPayment = () => push(ROUTE_PAYMENT)

  return (
    <BaseContainer header="Review Recipient Details" buttonText="Confirm" onClick={onPayment} backIcon>
      <section className={`flex-col-center`}>
        <RecipientCard />
        <section className={`flex`}>
          <ImageView className={styles.check_icon} src={assets.ic_checkbox} alt="" imgSize={24} />
          <h5 className={styles.detail_wrapper}>Are the recipient and benificiary same</h5>
        </section>
      </section>
    </BaseContainer>
  )
}

export default ReviewDetails

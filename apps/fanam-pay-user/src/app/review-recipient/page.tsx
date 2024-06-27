"use client"

import {BaseContainer, RecipientCard} from "organisms"
import {useHandler} from "./handler"
import styles from "./page.module.sass"

const ReviewDetails = () => {
  const {onPayment, onToggle} = useHandler()

  return (
    <BaseContainer
      header="Review Recipient Details"
      buttonText="Confirm"
      onClick={onPayment}
      childWrapper={styles.page_wrapper}
      stepIndex={3}>
      <RecipientCard onEdit={onToggle} />
    </BaseContainer>
  )
}

export default ReviewDetails

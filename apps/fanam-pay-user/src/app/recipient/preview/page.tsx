"use client"

import {BaseContainer, RecipientCard} from "organisms"
import {useHandler} from "./handler"
import styles from "./page.module.sass"

const RecipientPreview = () => {
  const {onPayment, onToggle} = useHandler()

  return (
    <BaseContainer
      header="Review Recipient Details"
      buttonText="Confirm"
      onSubmit={onPayment}
      childWrapper={styles.page_wrapper}
      stepIndex={3}>
      <RecipientCard onEdit={onToggle} />
    </BaseContainer>
  )
}

export default RecipientPreview

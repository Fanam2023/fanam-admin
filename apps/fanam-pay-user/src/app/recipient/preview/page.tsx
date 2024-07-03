"use client"

import {BaseContainer, RecipientCard} from "organisms"
import {useHandler} from "./handler"
import styles from "./page.module.sass"

const RecipientPreview = () => {
  const {onRouteToBeneficiary, onToggle, onBack} = useHandler()

  return (
    <BaseContainer
      header="Review Recipient Details"
      buttonText="Confirm"
      childWrapper={styles.page_wrapper}
      stepIndex={3}
      onSubmit={onRouteToBeneficiary}
      onBack={onBack}>
      <RecipientCard onEdit={onToggle} />
    </BaseContainer>
  )
}

export default RecipientPreview

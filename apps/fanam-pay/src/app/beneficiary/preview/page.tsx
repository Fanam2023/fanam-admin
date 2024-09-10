"use client"

import {BaseContainer, BeneficiaryCard} from "organisms"
import {useHandler} from "./handler"
import styles from "./page.module.sass"

const RecipientPreview = () => {
  const {onToggle, onBack, onRouteToPurpose} = useHandler()

  return (
    <BaseContainer
      header="Review Recipient Details"
      buttonText="Next"
      childWrapper={styles.page_wrapper}
      skipBtn="Back"
      stepIndex={3}
      onSubmit={onRouteToPurpose}
      onBack={onBack}>
      <BeneficiaryCard onEdit={onToggle} />
    </BaseContainer>
  )
}

export default RecipientPreview

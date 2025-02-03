"use client"

import {BaseContainer, BeneficiaryCard} from "organisms"
import {useHandler} from "./handler"
import styles from "./page.module.sass"

const RecipientPreview = () => {
  const {onToggle, onBack, onRouteToPurpose, t} = useHandler()

  return (
    <BaseContainer
      header="Review Recipient Details"
      buttonText={t("Next")}
      childWrapper={styles.page_wrapper}
      skipBtn={t("Back")}
      stepIndex={1}
      isStepper
      onSubmit={onRouteToPurpose}
      onBack={onBack}>
      <BeneficiaryCard onEdit={onToggle} />
    </BaseContainer>
  )
}

export default RecipientPreview

"use client"

import {BaseContainer, RecipientCard} from "organisms"
import {useHandler} from "./handler"
import styles from "./page.module.sass"

const RecipientPreview = () => {
  const {onToggle, onBack, data, errData, isSamePerson, onSubmit, onChangeValue} = useHandler()
  const {recipient_relationship, is_same_person} = data
  const {errRelationShip} = errData

  return (
    <BaseContainer
      header="Review Recipient Details"
      buttonText="Next"
      childWrapper={styles.page_wrapper}
      skipBtn="Back"
      stepIndex={0}
      isStepper
      onSubmit={onSubmit}
      onBack={onBack}>
      <RecipientCard
        onEdit={onToggle}
        isSame={isSamePerson}
        isPerson={is_same_person}
        onChangeData={onChangeValue}
        relation={recipient_relationship}
        error={errRelationShip}
      />
    </BaseContainer>
  )
}

export default RecipientPreview

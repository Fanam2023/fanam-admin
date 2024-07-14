"use client"

import {Checkbox, DropDown} from "@fanam-pkg/core-ui-sass"
import {BaseContainer, RecipientCard} from "organisms"
import {RELATION_SHIP} from "utils"
import {useHandler} from "./handler"
import styles from "./page.module.sass"

const RecipientPreview = () => {
  const {onRouteToBeneficiary, onToggle, onBack, data, errData, isSamePerson, onSubmit, onChangeValue} = useHandler()
  const {recipient_relationship, is_same_person} = data
  const {errRelationShip} = errData

  return (
    <BaseContainer
      header="Review Recipient Details"
      buttonText="Confirm"
      childWrapper={styles.page_wrapper}
      stepIndex={3}
      onSubmit={onSubmit}
      onBack={onBack}>
      <RecipientCard onEdit={onToggle} />
      <section>
        <section className={`flex ${styles.check_box_wrapper}`}>
          <Checkbox item={is_same_person} name="is_same_person" onSelectItem={onChangeValue} />
          <h4 className={styles.text}>Are the recipient and the beneficiary the same</h4>
        </section>
        {isSamePerson && (
          <DropDown
            label="Select Relationship with Recipient"
            options={RELATION_SHIP}
            onChangeData={onChangeValue}
            name="recipient_relationship"
            selected={recipient_relationship}
            wrapperClass={styles.drop_down}
            error={errRelationShip}
          />
        )}
        <h6 className={styles.content}>
          Beneficiary is a person on whose behalf the sender is making payment to the Recipient
        </h6>
      </section>
    </BaseContainer>
  )
}

export default RecipientPreview

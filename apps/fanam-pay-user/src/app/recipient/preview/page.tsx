"use client"

import {Checkbox, DropDown} from "@fanam-pkg/core-ui-sass"
import {BaseContainer, RecipientCard} from "organisms"
import {RELATION_SHIP} from "utils"
import {useHandler} from "./handler"
import styles from "./page.module.sass"

const RecipientPreview = () => {
  const {onRouteToBeneficiary, onToggle, onBack, isSelected, setIsSelected} = useHandler()

  return (
    <BaseContainer
      header="Review Recipient Details"
      buttonText="Confirm"
      childWrapper={styles.page_wrapper}
      stepIndex={3}
      onSubmit={onRouteToBeneficiary}
      onBack={onBack}>
      <RecipientCard onEdit={onToggle} />
      <section>
        <section className={`flex ${styles.check_box_wrapper}`}>
          <Checkbox item={{label: "", isSelected: isSelected}} onSelectItem={setIsSelected.bind(null, !isSelected)} />
          <h4 className={styles.text}>Are the recipient and the beneficiary the same</h4>
        </section>
        <DropDown options={!isSelected && RELATION_SHIP} onChangeData={() => {}} wrapperClass={styles.drop_down} />
        <h6 className={styles.content}>
          Beneficiary is a person on whose behalf the sender is making payment to the Recipient
        </h6>
      </section>
    </BaseContainer>
  )
}

export default RecipientPreview

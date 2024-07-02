"use client"

import {Checkbox, DropDown} from "@fanam-pkg/core-ui-sass"
import {BaseContainer} from "organisms"
import {RELATION_SHIP} from "utils"
import {useHandler} from "./handler"
import styles from "./page.module.sass"

const RecipientRelation = () => {
  const {isSelected, setIsSelected} = useHandler()

  return (
    <BaseContainer
      header="Sender’s Relationship with the Recipient"
      stepIndex={3}
      childWrapper={styles.page_container}
      buttonText="Continue">
      <section>
        <h3>Sender’s Relationship with the Recipient</h3>
        <DropDown options={RELATION_SHIP} onChangeData={() => {}} wrapperClass={styles.drop_down} />
        <h6 className={styles.content}>
          Beneficiary is a person on whose behalf the sender is making payment to the Recipient
        </h6>
        <section className={`flex ${styles.check_box_wrapper}`}>
          <Checkbox item={{label: "", isSelected: isSelected}} onSelectItem={setIsSelected.bind(null, !isSelected)} />
          <h4>Are the recipient and the beneficiary the same</h4>
        </section>
      </section>
    </BaseContainer>
  )
}

export default RecipientRelation

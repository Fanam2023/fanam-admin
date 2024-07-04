"use client"

import {GroupForm} from "@fanam-pkg/core-ui-sass"
import {BaseContainer} from "organisms"
import useHandler from "./handler"
import styles from "./sender.module.sass"

const SenderForm = () => {
  const {formElements, onSubmit} = useHandler(styles)

  return (
    <BaseContainer
      header="Cross Border Remittance"
      childWrapper={styles.page_container}
      backIcon={false}
      buttonText="continue"
      onSubmit={onSubmit}
      stepIndex={0}>
      <section className={styles.container_wrapper}>
        <h2>Add Sender Details</h2>
        <GroupForm formSections={formElements} />
      </section>
    </BaseContainer>
  )
}

export default SenderForm

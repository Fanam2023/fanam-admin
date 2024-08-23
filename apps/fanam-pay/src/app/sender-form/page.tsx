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
      buttonText="Next"
      onSubmit={onSubmit}
      skipBtn="Back"
      stepIndex={0}>
      <section className={styles.container_wrapper}>
        <h2>Sender Details</h2>
        <h6>Essential for verification and processing your transactions securely and efficiently.</h6>
      </section>
      <section className={styles.sender_form_wrapper}>
        <h4 className={`semi-bold ${styles.type_wrapper}`}>Sender type</h4>
        <GroupForm formSections={formElements} />
      </section>
    </BaseContainer>
  )
}

export default SenderForm

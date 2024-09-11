"use client"

import {GroupForm} from "@fanam-pkg/core-ui-sass"
import {BaseContainer} from "organisms"
import useHandler from "./handler"
import styles from "./sender.module.sass"

const SenderForm = () => {
  const {individualForm, individualKYCElements, businessForm, individualType, onSubmit} = useHandler(styles)

  return (
    <BaseContainer
      childWrapper={styles.page_container}
      backIcon={false}
      buttonText="Next"
      onSubmit={onSubmit}
      skipBtn="Back"
      disabled
      stepIndex={0}>
      <h4 className="bold">Complete Your Profile</h4>
      <h6>Essential for verification and processing your transactions securely and efficiently.</h6>
      <section className={styles.sender_form_wrapper}>
        <h4 className={`semi-bold ${styles.type_wrapper}`}>Sender type</h4>
        <GroupForm formSections={individualType ? individualForm : businessForm} />
        <GroupForm formSections={individualKYCElements} />
      </section>
    </BaseContainer>
  )
}

export default SenderForm

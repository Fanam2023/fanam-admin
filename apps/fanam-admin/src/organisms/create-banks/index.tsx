"use client"

import {Button, GroupForm} from "@fanam-pkg/core-ui-sass"
import {BankDetailsProp} from "props"
import useHandler from "./handler"
import styles from "./styles.module.sass"

export const CreateBankDetails = ({details, refetch, clientId}: BankDetailsProp) => {
  const {formElements, onSubmit} = useHandler(styles, details, refetch, clientId)
  return (
    <section>
      <GroupForm formSections={formElements} wrapperClass={styles.main_container} />
      <section className={`flex ${styles.btn_container}`}>
        <Button wrapperClass={`${styles.bank_discard_btn}`}>Discard</Button>
        <Button wrapperClass={`${styles.bank_update_btn}`} onClick={onSubmit}>
          Save
        </Button>
      </section>
    </section>
  )
}

"use client"

import {Button, GroupForm} from "@fanam-pkg/core-ui-sass"
import {BankDetailsProp} from "props/bank"
import useHandler from "./handler"
import styles from "./styles.module.sass"

export const CreateBankDetails = ({client_id}: BankDetailsProp) => {
  const {formElements, onSubmit} = useHandler(styles)
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

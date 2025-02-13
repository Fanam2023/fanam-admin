"use client"

import {Button, GroupForm} from "@fanam-pkg/core-ui-sass"
import {useRouter} from "next/navigation"
import {BankDetailsProp} from "props/bank"
import {ROUTE_BANK} from "utils"
import useHandler from "./handler"
import styles from "./styles.module.sass"

export const CreateBankDetails = ({client_id}: BankDetailsProp) => {
  const {formElements, onSubmit} = useHandler(styles, {
    client_id: "",
    bank_name: "",
    mobile: "",
    contact_person_name: "",
    email: "",
    alternative: "",
    designation: "",
  })
  const {push} = useRouter()
  return (
    <section>
      <GroupForm formSections={formElements} wrapperClass={styles.main_container} />
      <section className={`flex ${styles.btn_container}`}>
        <Button wrapperClass={`${styles.bank_discard_btn}`} onClick={() => push(ROUTE_BANK)}>
          Discard
        </Button>
        <Button wrapperClass={`${styles.bank_update_btn}`} onClick={onSubmit}>
          Save
        </Button>
      </section>
    </section>
  )
}

"use client"

import {Button, GroupForm, ImageView} from "@fanam-pkg/core-ui-sass"
import assets from "assets"
import {editHandler} from "./handler"
import styles from "./page.module.sass"

const EditDetails = () => {
  const {editForm} = editHandler()

  return (
    <>
      <h5 className={`${styles.topic}`}>Bank / Bank list / Bank Details /</h5>
      <section className={`flex ${styles.head_container} `}>
        <ImageView src={assets.ic_back_arrow} alt="ic_back_arrow" imgSize={16} />
        <h3 className={`${styles.back_head}`}>Edit Details</h3>
      </section>
      <section>
        <GroupForm formSections={editForm} wrapperClass={`${styles.form_container}`} />
      </section>
      <section className={`flex ${styles.btn_container}`}>
        <Button wrapperClass={`${styles.bank_discard_btn}`}>Discard</Button>
        <Button wrapperClass={`${styles.bank_update_btn}`}>Update</Button>
      </section>
    </>
  )
}

export default EditDetails

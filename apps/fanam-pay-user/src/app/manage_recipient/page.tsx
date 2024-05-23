"use client"

import {ImageView, TextField} from "@fanam-pkg/core-ui-sass"
import assets from "assets"
import {BaseContainer} from "organisms"
import styles from "./page.module.sass"

const ManageRecipient = () => {
  return (
    <BaseContainer header={"Manage Recipients"} addButton="Add">
      <section className={styles.page_container}>
        <TextField
          type="text"
          placeholder={"Search beneficiary.."}
          wrapperClass={styles.search_wrapper}
          leadingIcon={assets.ic_search}></TextField>
        <section className={`flex-col ${styles.beneficiary_container}`}>
          <h3>Saved beneficiary</h3>
          <section className={`flex ${styles.beneficiary_wrapper}`}>
            <ImageView src={assets.ic_user} alt={"user-profile"} imgSize={46} />
            <section className={`flex-sb-center ${styles.user_wrapper}`}>
              <section className={`flex-col ${styles.user_details}`}>
                <h3>{"Rithick"}</h3>
                <h5>{"xxxx xxxxx x6790"}</h5>
              </section>
              <ImageView src={assets.ic_profile_edit} alt={"edit-icon"} imgSize={24} />
            </section>
          </section>
        </section>
      </section>
    </BaseContainer>
  )
}

export default ManageRecipient

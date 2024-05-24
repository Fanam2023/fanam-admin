"use client"

import {BaseContainer, ManageSaved} from "organisms"
import styles from "./page.module.sass"

const ManageRecipient = () => {
  const recipients = [
    {email: "xxxx xxxxx x6790", name: "Rithick"},
    {email: "yyyy yyyyy y1234", name: "Alex"},
    {email: "zzzz zzzzz z5678", name: "Taylor"},
  ]
  return (
    <BaseContainer header={"Manage Recipients"} addButton="Add" childWrapper={styles.page_container}>
      <ManageSaved recipients={recipients} title="Saved Recipients" placeHolderName="Search Recipients..." />
    </BaseContainer>
  )
}

export default ManageRecipient

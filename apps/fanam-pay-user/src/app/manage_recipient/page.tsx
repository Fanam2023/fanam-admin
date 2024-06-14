"use client"

import {BaseContainer, ManageMembers} from "organisms"
import {useRecipient} from "./handler"
import styles from "./page.module.sass"

const ManageRecipient = () => {
  const {recipients, onNav} = useRecipient()

  return (
    <BaseContainer header="Manage Recipients" addButton="Add" onClick={onNav} childWrapper={styles.page_container}>
      <ManageMembers recipients={recipients} title="Saved Recipients" placeHolderName="Search Recipients..." />
    </BaseContainer>
  )
}

export default ManageRecipient

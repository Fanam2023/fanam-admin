"use client"

import {BaseContainer, ManageMembers} from "organisms"
import {recipientsDetails} from "utils"
import styles from "./page.module.sass"

const ManageRecipient = () => (
  <BaseContainer header={"Manage Recipients"} addButton="Add" childWrapper={styles.page_container}>
    <ManageMembers recipients={recipientsDetails} title="Saved Recipients" placeHolderName="Search Recipients..." />
  </BaseContainer>
)

export default ManageRecipient

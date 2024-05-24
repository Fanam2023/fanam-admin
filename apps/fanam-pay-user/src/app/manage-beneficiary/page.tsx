"use client"

import {BaseContainer, ManageMembers} from "organisms"
import {beneficiaryDetails} from "utils"
import styles from "./page.module.sass"

const ManageBeneficiary = () => (
  <BaseContainer header={"Manage Beneficiary"} addButton="Add" childWrapper={styles.page_container}>
    <ManageMembers recipients={beneficiaryDetails} title="Saved Recipients" placeHolderName="Search beneficiary..." />
  </BaseContainer>
)

export default ManageBeneficiary

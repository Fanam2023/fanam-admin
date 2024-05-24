"use client"

import {BaseContainer, ManageSaved} from "organisms"
import styles from "./page.module.sass"

const ManageBeneficiary = () => {
  const beneficiary = [
    {email: "roshini@gmail.com", name: "Roshini"},
    {email: "alex@gmail.com", name: "Alex"},
    {email: "taylor@gmail.com", name: "Taylor"},
  ]
  return (
    <BaseContainer header={"Manage Beneficiary"} addButton="Add" childWrapper={styles.page_container}>
      <ManageSaved recipients={beneficiary} title="Saved Recipients" placeHolderName="Search beneficiary..." />
    </BaseContainer>
  )
}
export default ManageBeneficiary

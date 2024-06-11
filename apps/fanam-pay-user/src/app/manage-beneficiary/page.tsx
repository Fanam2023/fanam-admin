"use client"

import {BaseContainer, ManageMembers} from "organisms"
import {BENEFICIARY_LIST} from "utils"
import {useBeneficiary} from "./handler"
import styles from "./page.module.sass"

const ManageBeneficiary = () => {
  const {beneficiaries, onNav} = useBeneficiary(BENEFICIARY_LIST)

  return (
    <BaseContainer
      header={"Manage Beneficiary"}
      addButton="Add"
      childWrapper={styles.page_container}
      onClick={onNav}
      backIcon>
      <ManageMembers recipients={beneficiaries} title="Saved Recipients" placeHolderName="Search beneficiary..." />
    </BaseContainer>
  )
}

export default ManageBeneficiary

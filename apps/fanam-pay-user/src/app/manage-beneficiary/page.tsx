"use client"

import {useRouter} from "next/navigation"
import {BaseContainer, ManageMembers} from "organisms"
import {BENEFICIARY_LIST, ROUTE_BENEFICIARY} from "utils"
import styles from "./page.module.sass"

const ManageBeneficiary = () => {
  const {push} = useRouter()
  const goToBeneficiary = () => push(ROUTE_BENEFICIARY)

  return (
    <BaseContainer
      header={"Manage Beneficiary"}
      addButton="Add"
      childWrapper={styles.page_container}
      onClick={goToBeneficiary}
      backIcon>
      <ManageMembers
        recipients={BENEFICIARY_LIST.map(({name, email}) => ({title: name, description: email}))}
        title="Saved Recipients"
        placeHolderName="Search beneficiary..."
      />
    </BaseContainer>
  )
}

export default ManageBeneficiary

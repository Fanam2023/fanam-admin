"use client"

import {useRouter} from "next/navigation"
import {BaseContainer, ManageMembers} from "organisms"
import {BENEFICIARY_LIST, ROUTE_ADD_BENEFICIARY} from "utils"
import {useBeneficiary} from "./handler"
import styles from "./page.module.sass"

const ManageBeneficiary = () => {
  const {push} = useRouter()
  const onNav = () => push(ROUTE_ADD_BENEFICIARY)
  const beneficiaryDeatil = useBeneficiary(BENEFICIARY_LIST)

  return (
    <BaseContainer
      header={"Manage Beneficiary"}
      addButton="Add"
      childWrapper={styles.page_container}
      onClick={onNav}
      backIcon>
      <ManageMembers recipients={beneficiaryDeatil} title="Saved Recipients" placeHolderName="Search beneficiary..." />
    </BaseContainer>
  )
}

export default ManageBeneficiary

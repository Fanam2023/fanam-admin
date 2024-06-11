"use client"

import {useRouter} from "next/navigation"
import {BaseContainer, ManageMembers} from "organisms"
import {RECIPIENT_LIST, ROUTE_RECIPIENT} from "utils"
import styles from "./page.module.sass"

const ManageRecipient = () => {
  const {push} = useRouter()
  const goToRecipientDetails = () => push(ROUTE_RECIPIENT)
  return (
    <BaseContainer
      header={"Manage Recipients"}
      addButton="Add"
      onClick={goToRecipientDetails}
      childWrapper={styles.page_container}
      backIcon>
      <ManageMembers
        recipients={RECIPIENT_LIST.map(({name, accountNumber}) => ({title: name, description: accountNumber}))}
        title="Saved Recipients"
        placeHolderName="Search Recipients..."
      />
    </BaseContainer>
  )
}

export default ManageRecipient

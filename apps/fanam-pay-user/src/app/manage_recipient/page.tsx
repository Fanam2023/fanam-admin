"use client"

import {useRouter} from "next/navigation"
import {BaseContainer, ManageMembers} from "organisms"
import {RECIPIENT_LIST, ROUTE_ADD_RECEPIENT} from "utils"
import {useRecipient} from "./handler"
import styles from "./page.module.sass"

const ManageRecipient = () => {
  const {push} = useRouter()
  const onNav = () => push(ROUTE_ADD_RECEPIENT)
  const {recipients} = useRecipient(RECIPIENT_LIST)

  return (
    <BaseContainer
      header={"Manage Recipients"}
      addButton="Add"
      onClick={onNav}
      childWrapper={styles.page_container}
      backIcon>
      <ManageMembers recipients={recipients} title="Saved Recipients" placeHolderName="Search Recipients..." />
    </BaseContainer>
  )
}

export default ManageRecipient

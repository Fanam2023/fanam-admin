"use client"

import {useRouter} from "next/navigation"
import {BaseContainer, ManageMembers} from "organisms"
import {RECIPIENT_LIST, ROUTE_ADD_RECEPIENT} from "utils"
import styles from "./page.module.sass"

const ManageRecipient = () => {
  const {push} = useRouter()
  const onNav = () => push(ROUTE_ADD_RECEPIENT)

  return (
    <BaseContainer
      header={"Manage Recipients"}
      addButton="Add"
      onClick={onNav}
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

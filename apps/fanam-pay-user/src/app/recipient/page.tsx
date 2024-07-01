"use client"

import {TextField} from "@fanam-pkg/core-ui-sass"
import {useResize} from "@fanam-pkg/core-utils"
import {IRecipient} from "@custom/utils"
import assets from "assets"
import {BaseContainer, ManageMembers} from "organisms"
import {useHandler} from "./handler"
import styles from "./page.module.sass"

const Recipient = () => {
  const {isDesktop} = useResize()
  const {recipients, onNav, onChangeSearch, routeToDetails, onAdd} = useHandler()

  const renderRecipients = ({recipient_name, email, recipient_id}: IRecipient) => (
    <ManageMembers description={email} title={recipient_name} onEdit={routeToDetails.bind(null, recipient_id)} />
  )

  return (
    <BaseContainer
      header={"Manage Recipients"}
      addButton="Add"
      onAdd={onNav}
      childWrapper={styles.page_container}
      backIcon
      stepIndex={2}>
      <section className={`flex ${styles.search_container}`}>
        <TextField
          type="text"
          placeholder="Search beneficiary.."
          wrapperClass={styles.search_wrapper}
          leadingIcon={assets.ic_search}
          onChangeData={onChangeSearch}></TextField>
        {isDesktop && (
          <h4 className={styles.add_text} onClick={onAdd}>
            Add
          </h4>
        )}
      </section>
      <h3 className={styles.save_text}>Saved Recipients</h3>
      {recipients?.map(renderRecipients)}
    </BaseContainer>
  )
}

export default Recipient

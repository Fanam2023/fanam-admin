"use client"

import {TextField} from "@fanam-pkg/core-ui-sass"
import {IRecipient} from "@custom/utils"
import assets from "assets"
import {BaseContainer, ManageMembers} from "organisms"
import {useHandler} from "./handler"
import styles from "./page.module.sass"

const RecipientPage = () => {
  const {recipients, onChangeSearch, routeToDetails, onAdd, isDesktop, onBack, linkRecipient} = useHandler()

  const renderRecipients = ({first_name, last_name, email, recipient_id}: IRecipient) => (
    <ManageMembers
      key={recipient_id}
      description={email}
      title={`${first_name} ${last_name}`}
      onEdit={routeToDetails.bind(null, recipient_id)}
      onSelect={linkRecipient.bind(null, recipient_id)}
    />
  )

  return (
    <BaseContainer
      header={"Manage Recipients"}
      addButton="Add"
      childWrapper={styles.page_container}
      backIcon
      stepIndex={3}
      onAdd={onAdd}
      onBack={onBack}>
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

export default RecipientPage

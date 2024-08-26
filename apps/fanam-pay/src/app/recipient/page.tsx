"use client"

import {TextField} from "@fanam-pkg/core-ui-sass"
import {IRecipient} from "@custom/utils"
import assets from "assets"
import {BaseContainer, ManageMembers} from "organisms"
import {useHandler} from "./handler"
import styles from "./page.module.sass"

const RecipientPage = () => {
  const {recipients, onChangeSearch, routeToDetails, onAdd, isDesktop, onBack, linkRecipient, searchQuery} =
    useHandler()

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
      buttonText="Next"
      skipBtn="Back"
      stepIndex={3}
      onAdd={onAdd}
      onBack={onBack}>
      <section className={`flex-col ${styles.recipient_wrapper}`}>
        <h3 className="bold">Add Recipient</h3>
        <h5>Enter the Recipient details and their account details.</h5>
      </section>
      <section className={`flex ${styles.search_container}`}>
        <TextField
          type="text"
          label="Search Recipient.."
          wrapperClass={styles.search_wrapper}
          leadingIcon={searchQuery.length ? null : assets.ic_search}
          onChangeData={onChangeSearch}></TextField>
        {isDesktop && (
          <h4 className={styles.add_text} onClick={onAdd}>
            Add
          </h4>
        )}
      </section>
      <h5 className={`bold ${styles.save_text}`}>Saved Recipients</h5>
      <section className={styles.members}>{recipients?.map(renderRecipients)}</section>
    </BaseContainer>
  )
}

export default RecipientPage

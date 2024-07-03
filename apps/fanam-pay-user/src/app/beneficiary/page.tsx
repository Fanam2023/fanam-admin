"use client"

import {TextField} from "@fanam-pkg/core-ui-sass"
import {IBeneficiary} from "@custom/utils"
import assets from "assets"
import {BaseContainer, ManageMembers} from "organisms"
import {useHandler} from "./handler"
import styles from "./page.module.sass"

const BeneficiaryPage = () => {
  const {onNav, beneficiaries, onChangeSearch, routeToDetails, isDesktop} = useHandler()

  const renderBeneficiary = ({beneficiary_name, email, beneficiary_id}: IBeneficiary) => (
    <ManageMembers description={email} title={beneficiary_name} onEdit={routeToDetails.bind(null, beneficiary_id)} />
  )

  return (
    <BaseContainer
      header="Manage Beneficiary"
      addButton="Add"
      childWrapper={styles.page_container}
      onAdd={onNav}
      backIcon
      stepIndex={4}>
      <section className={`flex ${styles.search_container}`}>
        <TextField
          type="text"
          placeholder="Search beneficiary.."
          wrapperClass={styles.search_wrapper}
          leadingIcon={assets.ic_search}
          onChangeData={onChangeSearch}></TextField>
        {isDesktop && (
          <h4 className={styles.add_text} onClick={onNav}>
            Add
          </h4>
        )}
      </section>
      <h3 className={styles.save_text}>Saved Beneficiary</h3>
      {beneficiaries?.map(renderBeneficiary)}
    </BaseContainer>
  )
}

export default BeneficiaryPage

"use client"

import {TextField} from "@fanam-pkg/core-ui-sass"
import {IBeneficiary} from "@custom/utils"
import assets from "assets"
import {BaseContainer, ManageMembers} from "organisms"
import {useHandler} from "./handler"
import styles from "./page.module.sass"

const BeneficiaryPage = () => {
  const {onNav, beneficiaries, onChangeSearch, routeToDetails, onBack, linkBeneficiary, searchQuery} = useHandler()

  const renderBeneficiary = ({first_name, last_name, email, beneficiary_id}: IBeneficiary) => (
    <ManageMembers
      key={beneficiary_id}
      description={email}
      title={`${first_name}${last_name}`}
      onEdit={routeToDetails.bind(null, beneficiary_id)}
      onSelect={linkBeneficiary.bind(null, beneficiary_id)}
    />
  )

  return (
    <BaseContainer
      header="Manage Beneficiary"
      childWrapper={styles.page_container}
      backIcon
      stepIndex={1}
      skipBtn="Back"
      isStepper
      onBack={onBack}>
      <section className={`flex-col ${styles.beneficiary_wrapper}`}>
        <h3 className={`bold ${styles.title}`}>Add or Select Beneficiary</h3>
        <h5 className={styles.description}>
          If your recipient and beneficiary are different, enter the beneficiary details..
        </h5>
      </section>
      <section className={`flex ${styles.search_container}`}>
        <TextField
          type="text"
          label="Search beneficiary.."
          wrapperClass={styles.search_wrapper}
          leadingIcon={searchQuery.length ? null : assets.ic_search}
          onChangeData={onChangeSearch}></TextField>
        <h4 className={styles.add_text} onClick={onNav}>
          Add
        </h4>
      </section>
      <h5 className={`bold ${styles.save_text}`}>Saved Beneficiary</h5>
      <ul className={styles.members}>{beneficiaries?.map(renderBeneficiary)}</ul>
    </BaseContainer>
  )
}

export default BeneficiaryPage

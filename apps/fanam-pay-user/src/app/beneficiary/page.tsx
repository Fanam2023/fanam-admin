"use client"

import {TextField, useNotifyPopup} from "@fanam-pkg/core-ui-sass"
import {useResize} from "@fanam-pkg/core-utils"
import {useRouter} from "next/navigation"
import {IBeneficiary} from "@custom/utils"
import assets from "assets"
import {BaseContainer, ManageMembers} from "organisms"
import {routeToBeneficiaryDetails} from "utils"
import {useHandler} from "./handler"
import styles from "./page.module.sass"

const Beneficiary = () => {
  const {toggleNotify} = useNotifyPopup()
  const {push} = useRouter()
  const {
    onNav,
    isSliderVisible,
    setIsSliderVisible,
    mutate,
    beneficiaries,
    onChangeSearch,
    currentBeneficiary,
    onEditBeneficiary,
    updateApi,
  } = useHandler(onSuccess, () => {})
  const {isDesktop} = useResize()

  // const routeToDetails = (beneficiaryId: string) => push(routeToBeneficiaryDetails(beneficiaryId))

  const routeToDetails = (beneficiaryId: string) => {
    const beneficiary = beneficiaries.find(b => b.beneficiary_id === beneficiaryId)
    if (isDesktop) {
      onEditBeneficiary(beneficiary)
    } else {
      push(routeToBeneficiaryDetails(beneficiaryId))
    }
  }

  function onSuccess() {
    toggleNotify({
      type: "success",
      title: "Beneficiary added",
      description: "Beneficiary added successfully",
    })
  }

  const renderBeneficiary = ({beneficiary_name, email, beneficiary_id}: IBeneficiary) => (
    <ManageMembers description={email} title={beneficiary_name} onEdit={routeToDetails.bind(null, beneficiary_id)} />
  )

  return (
    <BaseContainer
      header={"Manage Beneficiary"}
      addButton="Add"
      childWrapper={styles.page_container}
      onClick={onNav}
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
          <h4 className={styles.add_text} onClick={setIsSliderVisible.bind(null, true)}>
            Add
          </h4>
        )}
      </section>
      <h3 className={styles.save_text}>Saved Beneficiary</h3>
      {beneficiaries?.map(renderBeneficiary)}
    </BaseContainer>
  )
}

export default Beneficiary

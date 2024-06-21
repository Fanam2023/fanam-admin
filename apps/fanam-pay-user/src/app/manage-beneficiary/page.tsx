"use client"

import {BaseContainer, CreateBeneficiary, ManageMembers} from "organisms"
import {useHandler} from "./handler"
import styles from "./page.module.sass"

const ManageBeneficiary = () => {
  const {beneficiaryList, onNav, isSliderVisible, setIsSliderVisible, onRouteToOptions, onChangeSearch} = useHandler()

  return (
    <BaseContainer
      header={"Manage Beneficiary"}
      addButton="Add"
      childWrapper={styles.page_container}
      onClick={onNav}
      backIcon
      stepIndex={4}>
      <CreateBeneficiary isVisible={isSliderVisible} setIsVisible={setIsSliderVisible} title="Add New Benificiary" />
      <ManageMembers
        recipients={beneficiaryList}
        title="Saved Beneficiary"
        placeHolderName="Search beneficiary..."
        onChangeSearch={onChangeSearch}
        onAddButton={() => setIsSliderVisible(true)}
      />
    </BaseContainer>
  )
}

export default ManageBeneficiary

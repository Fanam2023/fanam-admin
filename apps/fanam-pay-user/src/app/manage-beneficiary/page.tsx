"use client"

import BenificiaryDetail from "app/benificiary-details/page"
import {BaseContainer, ManageMembers, Slider} from "organisms"
import {useHandler} from "./handler"
import styles from "./page.module.sass"

const ManageBeneficiary = () => {
  const {beneficiaries, onNav, isSliderVisible, setIsSliderVisible, onRouteToOptions} = useHandler()

  return (
    <BaseContainer
      header={"Manage Beneficiary"}
      addButton="Add"
      childWrapper={styles.page_container}
      onClick={onNav}
      backIcon
      stepIndex={4}>
      <Slider
        isVisible={isSliderVisible}
        setIsVisible={setIsSliderVisible}
        title="Add New Benificiary"
        onClick={onRouteToOptions}>
        <BenificiaryDetail />
      </Slider>
      <ManageMembers
        recipients={beneficiaries}
        title="Saved Beneficiary"
        placeHolderName="Search beneficiary..."
        onAddButton={() => setIsSliderVisible(true)}
      />
    </BaseContainer>
  )
}

export default ManageBeneficiary

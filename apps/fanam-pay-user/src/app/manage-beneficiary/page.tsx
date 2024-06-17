"use client"

import BenificiaryDetail from "app/benificiary-details/page"
import {BaseContainer, ManageMembers, Slider} from "organisms"
import {useBeneficiaryHandler} from "./handler"
import styles from "./page.module.sass"

const ManageBeneficiary = () => {
  const {beneficiaries, onNav, isSliderVisible, setIsSliderVisible} = useBeneficiaryHandler()

  return (
    <BaseContainer
      header={"Manage Beneficiary"}
      addButton="Add"
      childWrapper={styles.page_container}
      onClick={onNav}
      backIcon>
      <Slider isVisible={isSliderVisible} setIsVisible={setIsSliderVisible} title="Add New Benificiary">
        <BenificiaryDetail />
      </Slider>
      <ManageMembers
        recipients={beneficiaries}
        title="Saved Recipients"
        placeHolderName="Search beneficiary..."
        onAddButton={() => setIsSliderVisible(true)}
      />
    </BaseContainer>
  )
}

export default ManageBeneficiary

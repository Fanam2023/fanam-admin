"use client"

import {BaseContainer, CreateRecipient, ManageMembers} from "organisms"
import {useHandler} from "./handler"
import styles from "./page.module.sass"

const ManageRecipient = () => {
  const {recipientList, onNav, isSliderVisible, setIsSliderVisible, onRouteToReview, onChangeSearch} = useHandler()

  return (
    <BaseContainer
      header={"Manage Recipients"}
      addButton="Add"
      onClick={onNav}
      childWrapper={styles.page_container}
      backIcon
      stepIndex={2}>
      <CreateRecipient isVisible={isSliderVisible} setIsVisible={setIsSliderVisible} title="Add New Benificiary" />
      <ManageMembers
        recipients={recipientList}
        title="Saved Recipients"
        placeHolderName="Search Recipients..."
        onChangeSearch={onChangeSearch}
        onAddButton={() => setIsSliderVisible(true)}
      />
    </BaseContainer>
  )
}

export default ManageRecipient

"use client"

import RecipientDetail from "app/recipient-detail/page"
import {BaseContainer, ManageMembers, Slider} from "organisms"
import {useHandler} from "./handler"
import styles from "./page.module.sass"

const ManageRecipient = () => {
  const {recipientList, onNav, isSliderVisible, setIsSliderVisible, onRouteToReview} = useHandler()

  return (
    <BaseContainer
      header={"Manage Recipients"}
      addButton="Add"
      onClick={onNav}
      childWrapper={styles.page_container}
      backIcon
      stepIndex={2}>
      <Slider
        isVisible={isSliderVisible}
        setIsVisible={setIsSliderVisible}
        title="Add New Recipient"
        onClick={onRouteToReview}>
        {<RecipientDetail />}
      </Slider>
      <ManageMembers
        recipients={recipientList}
        title="Saved Recipients"
        placeHolderName="Search Recipients..."
        onAddButton={() => setIsSliderVisible(true)}
      />
    </BaseContainer>
  )
}

export default ManageRecipient

"use client"

import RecipientDetail from "app/recipient-detail/page"
import {BaseContainer, ManageMembers, Slider} from "organisms"
import {useRecipient} from "./handler"
import styles from "./page.module.sass"

const ManageRecipient = () => {
  const {recipients, onNav, isSliderVisible, setIsSliderVisible} = useRecipient()

  return (
    <BaseContainer
      header={"Manage Recipients"}
      addButton="Add"
      onClick={onNav}
      childWrapper={styles.page_container}
      backIcon>
      <Slider isVisible={isSliderVisible} setIsVisible={setIsSliderVisible} title="Add New Recipient">
        {<RecipientDetail />}
      </Slider>
      <ManageMembers
        recipients={recipients}
        title="Saved Recipients"
        placeHolderName="Search Recipients..."
        onAddButton={() => setIsSliderVisible(true)}
      />
    </BaseContainer>
  )
}

export default ManageRecipient

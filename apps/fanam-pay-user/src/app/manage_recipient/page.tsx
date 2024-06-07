import {BaseContainer, ManageMembers} from "organisms"
import {RECIPIENT_LIST} from "utils"
import styles from "./page.module.sass"

const ManageRecipient = () => (
  <BaseContainer header={"Manage Recipients"} addButton="Add" childWrapper={styles.page_container} backIcon>
    <ManageMembers
      recipients={RECIPIENT_LIST.map(({name, accountNumber}) => ({title: name, description: accountNumber}))}
      title="Saved Recipients"
      placeHolderName="Search Recipients..."
    />
  </BaseContainer>
)

export default ManageRecipient

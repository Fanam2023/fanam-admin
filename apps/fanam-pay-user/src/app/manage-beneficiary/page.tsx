import {BaseContainer, ManageMembers} from "organisms"
import {BENEFICIARY_LIST} from "utils"
import styles from "./page.module.sass"

const ManageBeneficiary = () => (
  <BaseContainer header={"Manage Beneficiary"} addButton="Add" childWrapper={styles.page_container}>
    <ManageMembers
      recipients={BENEFICIARY_LIST.map(({name, email}) => ({title: name, description: email}))}
      title="Saved Recipients"
      placeHolderName="Search beneficiary..."
    />
  </BaseContainer>
)

export default ManageBeneficiary

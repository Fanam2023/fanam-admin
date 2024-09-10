import {Button, GroupForm} from "@fanam-pkg/core-ui-sass"
import {BeneficiaryDetailsProps} from "props/beneficiary"
import {useHandler} from "./handler"
import styles from "./styles.module.sass"

export const CreateBeneficiaryDetails = ({beneficiary_id}: BeneficiaryDetailsProps) => {
  const {onSubmit, formElements} = useHandler(styles, beneficiary_id)

  return (
    <section>
      <GroupForm formSections={formElements} wrapperClass={styles.input_wrapper} />
      <Button wrapperClass={styles.btn_wrapper} onClick={onSubmit}>
        Add Beneficiary
      </Button>
    </section>
  )
}

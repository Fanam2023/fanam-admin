import {Button, GroupForm} from "@fanam-pkg/core-ui-sass"
import {BaseContainer} from "organisms"
import {BeneficiaryDetailsProps} from "props/beneficiary"
import {useHandler} from "./handler"
import styles from "./styles.module.sass"

export const CreateBeneficiaryDetails = ({beneficiary_id}: BeneficiaryDetailsProps) => {
  const {onSubmit, formElements, isDesktop, toggleSlider} = useHandler(styles, beneficiary_id)

  return isDesktop ? (
    <section>
      <GroupForm formSections={formElements} wrapperClass={styles.input_wrapper} />
      <footer className={`flex ${styles.footer_wrapper}`}>
        {/* <Button buttonType="primary-outlined" wrapperClass={styles.btn_wrapper} onClick={() => toggleSlider()}>
          Back
        </Button> */}
        <Button wrapperClass={styles.btn_wrapper} onClick={onSubmit}>
          {/* Continue */}
          Add Beneficiary
        </Button>
      </footer>
    </section>
  ) : (
    <BaseContainer
      buttonText="Submit"
      header="Beneficiary Details"
      backIcon
      childWrapper={styles.child_wrapper}
      onSubmit={onSubmit}>
      <GroupForm formSections={formElements} wrapperClass={styles.input_wrapper} />
    </BaseContainer>
  )
}

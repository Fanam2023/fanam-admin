import {Button, GroupForm} from "@fanam-pkg/core-ui-sass"
import {BaseContainer} from "organisms"
import {RecipientDetailsProp} from "props"
import useHandler from "./handler"
import styles from "./styles.module.sass"

export const CreateRecipientDetails = ({recipient_id}: RecipientDetailsProp) => {
  const {formElements, onSubmit, isDesktop, toggleSlider} = useHandler(styles, recipient_id)

  return isDesktop ? (
    <section>
      <GroupForm formSections={formElements} wrapperClass={styles.input_wrapper} />
      <footer className={`flex ${styles.footer_wrapper}`}>
        <Button buttonType="primary-outlined" wrapperClass={styles.btn_wrapper} onClick={() => toggleSlider()}>
          Back
        </Button>
        <Button wrapperClass={styles.btn_wrapper} onClick={onSubmit}>
          Continue
        </Button>
      </footer>
    </section>
  ) : (
    <BaseContainer
      buttonText="Submit"
      header="Recipient Details"
      backIcon
      addButton="Add"
      childWrapper={styles.child_wrapper}
      onSubmit={onSubmit}>
      <GroupForm formSections={formElements} wrapperClass={styles.input_wrapper} />
    </BaseContainer>
  )
}

import {Button, GroupForm} from "@fanam-pkg/core-ui-sass"
import {RecipientDetailsProp} from "props"
import useHandler from "./handler"
import styles from "./styles.module.sass"

export const CreateRecipientDetails = ({recipient_id}: RecipientDetailsProp) => {
  const {formElements, onSubmit} = useHandler(styles, recipient_id)

  return (
    <section>
      <GroupForm formSections={formElements} wrapperClass={styles.input_wrapper} />
      <Button wrapperClass={styles.btn_wrapper} onClick={onSubmit}>
        Add Recipient
      </Button>
    </section>
  )
}

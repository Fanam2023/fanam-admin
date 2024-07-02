import {Button, GroupForm} from "@fanam-pkg/core-ui-sass"
import {useEffect} from "react"
import {BaseContainer} from "organisms"
import {RecipientDetailsProp} from "props"
import useHandler from "./handler"
import styles from "./styles.module.sass"

export const CreateRecipientDetails = ({onClickCreate, recipient}: RecipientDetailsProp) => {
  const {formElements, onChangeValue, onSubmit, isDesktop, toggleSlider} = useHandler(styles)

  useEffect(() => {
    onChangeValue({...recipient})
  }, [recipient])

  const onClickSubmit = () => {
    const payload = onSubmit()
    if (payload) {
      onClickCreate(payload)
    }
  }

  return isDesktop ? (
    <section>
      <GroupForm formSections={formElements} wrapperClass={styles.input_wrapper} />
      <footer className={`flex ${styles.footer_wrapper}`}>
        <Button buttonType="primary-outlined" wrapperClass={styles.btn_wrapper} onClick={() => toggleSlider()}>
          Back
        </Button>
        <Button wrapperClass={styles.btn_wrapper} onClick={onClickSubmit}>
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
      onSubmit={onClickSubmit}>
      <GroupForm formSections={formElements} wrapperClass={styles.input_wrapper} />
    </BaseContainer>
  )
}

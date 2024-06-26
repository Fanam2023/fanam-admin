import {Button, GroupForm} from "@fanam-pkg/core-ui-sass"
import {useEffect} from "react"
import {BaseContainer} from "organisms"
import {BeneficiaryDetailsProps} from "props/beneficiary"
import {useHandler} from "./handler"
import styles from "./styles.module.sass"

export const CreateBeneficiaryDetails = ({onClickCreate, beneficiaryDetails}: BeneficiaryDetailsProps) => {
  const {onChangeValue, onSubmit, onRouteToOptions, formElements, isDesktop, toggleSlider} = useHandler()

  useEffect(() => {
    onChangeValue({...beneficiaryDetails})
  }, [beneficiaryDetails])

  const onClickSubmit = () => {
    const payload = onSubmit()
    if (payload) {
      onClickCreate(payload)
      onRouteToOptions()
      toggleSlider()
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
      header="Beneficiary Details"
      backIcon
      childWrapper={styles.child_wrapper}
      onSubmit={onClickSubmit}>
      <GroupForm formSections={formElements} wrapperClass={styles.input_wrapper} />
    </BaseContainer>
  )
}

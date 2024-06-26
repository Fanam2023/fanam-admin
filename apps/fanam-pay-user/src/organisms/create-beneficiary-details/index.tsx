import {GroupForm} from "@fanam-pkg/core-ui-sass"
import {useResize} from "@fanam-pkg/core-utils"
import {useEffect} from "react"
import {BaseContainer} from "organisms"
import {BeneficiaryDetailsProps} from "props/beneficiary"
import {useHandler} from "./handler"
import styles from "./styles.module.sass"

export const CreateBeneficiaryDetails = ({
  isVisible,
  setIsVisible,
  title,
  wrapperClass,
  onClickCreate,
  beneficiaryDetails,
  onBack,
}: BeneficiaryDetailsProps) => {
  const {isDesktop} = useResize()
  const {onChangeValue, onSubmit, onRouteToOptions, formElements} = useHandler()

  useEffect(() => {
    onChangeValue({...beneficiaryDetails})
  }, [beneficiaryDetails])

  const onClickSubmit = () => {
    const payload = onSubmit()
    if (payload) {
      onClickCreate(payload)
      onRouteToOptions()
    }
  }

  return (
    <section>
      <BaseContainer
        buttonText="Submit"
        header="Beneficiary Details"
        onSubmit={onClickSubmit}
        backIcon
        containerClass={wrapperClass}
        onBack={onBack}
        childWrapper={styles.child_wrapper}>
        <GroupForm formSections={formElements} wrapperClass={styles.input_wrapper} />
      </BaseContainer>
    </section>
  )
}

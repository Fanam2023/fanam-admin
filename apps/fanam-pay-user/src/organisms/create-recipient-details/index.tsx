import {GroupForm} from "@fanam-pkg/core-ui-sass"
import {useResize} from "@fanam-pkg/core-utils"
import {useEffect} from "react"
import {BaseContainer} from "organisms/base-container"
import {Slider} from "organisms/slider"
import {RecipientDetailsProp} from "props"
import {useHandler} from "./handler"
import styles from "./styles.module.sass"

export const CreateRecipientDetails = ({
  isVisible,
  setIsVisible,
  title,
  onClickCreate,
  recipientDetails,
  wrapperClass,
  onBack,
}: RecipientDetailsProp) => {
  const {isDesktop} = useResize()
  const {formElements, onChangeValue, onSubmit} = useHandler()

  useEffect(() => {
    onChangeValue({...recipientDetails})
  }, [recipientDetails])

  const onClickSubmit = () => {
    const payload = onSubmit()
    if (payload) {
      onClickCreate(payload)
    }
  }

  return (
    <section>
      {isDesktop ? (
        <Slider isVisible={isVisible} setIsVisible={setIsVisible} title={title} onClick={onClickSubmit}>
          <GroupForm formSections={formElements} wrapperClass={styles.input_wrapper} />
        </Slider>
      ) : (
        <BaseContainer
          buttonText="Submit"
          header="Recipient Details"
          onSubmit={onClickSubmit}
          backIcon
          containerClass={wrapperClass}
          onBack={onBack}
          childWrapper={styles.child_wrapper}>
          <GroupForm formSections={formElements} wrapperClass={styles.input_wrapper} />
        </BaseContainer>
      )}
    </section>
  )
}

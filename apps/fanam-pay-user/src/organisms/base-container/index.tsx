import {Button, ImageView} from "@fanam-pkg/core-ui-sass"
import {useRouter} from "next/navigation"
import assets from "assets"
import {BaseConatinerProps} from "props"
import styles from "./style.module.sass"

export const BaseContainer = ({
  children,
  footerChild,
  addButton,
  header,
  buttonText,
  onClick,
  onBack,
  childWrapper = "",
  backIcon,
}: BaseConatinerProps) => {
  const {back} = useRouter()
  const goBack = () => {
    if (onBack) {
      onBack()
    } else {
      back()
    }
  }
  return (
    <section>
      <header className={`flex-sb-center ${styles.header_wrapper}`}>
        <section className={`flex ${styles.label_wrapper}`}>
          {!!backIcon && <ImageView src={assets.ic_back} alt="back_icon" imgSize={24} onClick={goBack} />}
          <h3>{header}</h3>
        </section>
        {!!addButton && <h3 onClick={onClick}>{addButton}</h3>}
      </header>
      <section className={`${childWrapper} ${styles.container_wrapper}`}>{children}</section>
      {(buttonText || footerChild) && (
        <footer className={`flex-col-center ${styles.footer_wrapper}`}>
          {!!buttonText && (
            <Button onClick={onClick} wrapperClass={styles.button_wrapper}>
              {buttonText}
            </Button>
          )}
          {footerChild}
        </footer>
      )}
    </section>
  )
}

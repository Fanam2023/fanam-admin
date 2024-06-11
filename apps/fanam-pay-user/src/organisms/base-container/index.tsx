"use client"

import {Button, ImageView} from "@fanam-pkg/core-ui-sass"
import {useResize} from "@fanam-pkg/core-utils/src/hooks"
import {useRouter} from "next/navigation"
import {useState} from "react"
import assets from "assets"
import {IStepper} from "model"
import {BaseConatinerProps} from "props"
import {SIDE_BAR} from "utils"
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
    if (onBack) onBack()
    else back()
  }

  const [selIndex, setSelIndex] = useState(3)
  const {isDesktop} = useResize()

  const renderSideBar = ({title, description}: IStepper, index: number) => {
    const isLastStep = index < SIDE_BAR.length - 1
    const isActive = index === selIndex
    const isCompleted = index < selIndex

    return (
      <section className={styles.content_wrapper} key={index}>
        <section className={`flex-col ${styles.stepper_container}`}>
          {isLastStep && (
            <section className={`${styles.progress_bar} ${isCompleted ? styles.progress_bar_completed : ""}`}></section>
          )}
          <h5 className={`${styles.stepper} ${isActive || isCompleted ? styles.active : ""}`}>{index + 1}</h5>
        </section>
        <section className={`flex-col ${styles.content}`}>
          <h5 className={`${isActive || isCompleted ? styles.active_title : styles.inactive_title}`}>{title}</h5>
          <h6 className={`${isActive || isCompleted ? styles.active_desc : styles.inactive_desc} `}>{description}</h6>
        </section>
      </section>
    )
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

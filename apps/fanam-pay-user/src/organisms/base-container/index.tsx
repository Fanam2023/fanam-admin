"use client"

import {Button, ImageView} from "@fanam-pkg/core-ui-sass"
import {useResize} from "@fanam-pkg/core-utils"
import assets from "assets"
import {IStepper} from "model"
import {BaseContainerProps} from "props"
import {SIDE_BAR} from "utils"
import {useHandler} from "./handler"
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
  backIcon = true,
  skipBtn,
  stepIndex,
  containerClass = "",
  onSubmit,
  onAdd,
}: BaseContainerProps) => {
  const {goBack} = useHandler()
  const {isDesktop} = useResize()

  const renderSideBar = ({title, description}: IStepper, index: number) => {
    const isLastStep = index < SIDE_BAR.length - 1
    const isActive = index === stepIndex
    const isCompleted = typeof stepIndex === "number" ? index < stepIndex : SIDE_BAR.length - 1 === index

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
    <section className={containerClass}>
      <header className={`flex-sb-center ${styles.header_wrapper}`}>
        <section className={`flex ${styles.label_wrapper}`}>
          {backIcon && (
            <ImageView src={assets.ic_back} alt="back_icon" imgSize={24} onClick={onBack ? onBack : goBack} />
          )}
          <h3>{header}</h3>
        </section>
        {isDesktop ? (
          <></>
        ) : (
          !!addButton && (
            <h3 onClick={onAdd} className={styles.add_text}>
              {addButton}
            </h3>
          )
        )}
      </header>
      <section className={styles.main_wrapper}>
        {isDesktop ? (
          <>
            <nav className={`flex-col ${styles.nav_container}`}>{SIDE_BAR.map(renderSideBar)}</nav>
            <section className={childWrapper}>{children}</section>
          </>
        ) : (
          <section className={childWrapper}>{children}</section>
        )}
      </section>
      {(buttonText || footerChild) && (
        <footer className={styles.footer_wrapper}>
          <section className={`flex ${styles.footer_content}`}>
            {!!buttonText && (
              <>
                {skipBtn && (
                  <Button onClick={onClick} wrapperClass={styles.skip_btn} buttonType="primary-outlined">
                    {skipBtn}
                  </Button>
                )}
                <Button onClick={onSubmit} wrapperClass={styles.button_wrapper}>
                  {buttonText}
                </Button>
              </>
            )}
          </section>
          {footerChild}
        </footer>
      )}
    </section>
  )
}

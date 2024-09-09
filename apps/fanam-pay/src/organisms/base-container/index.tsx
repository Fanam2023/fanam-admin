"use client"

import {Button, ImageView, usePopup} from "@fanam-pkg/core-ui-sass"
import {useResize} from "@fanam-pkg/core-utils"
import assets from "assets"
import {useSingleton} from "hooks"
import {IStepper} from "model"
import {OtpPopUp} from "organisms/otp"
import {BaseContainerProps} from "props"
import {SIDE_BAR} from "utils"
import styles from "./style.module.sass"

export const BaseContainer = ({
  children,
  footerChild,
  buttonText,
  addButton,
  onClick,
  onBack,
  childWrapper = "",
  skipBtn,
  stepIndex,
  profile,
  bellIcon,
  onSubmit,
  onAdd,
  isStepper,
}: BaseContainerProps) => {
  const {user} = useSingleton()
  const {first_name, last_name} = user || {}
  const {isDesktop} = useResize()
  const {togglePopup} = usePopup()

  const toggle = () => {
    togglePopup({
      title: "Verify Aadhaar",
      children: <OtpPopUp></OtpPopUp>,
      // isClosable: false,
    })
  }

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
    <>
      <header className={`flex-sb-center ${styles.header_wrapper}`}>
        <section className={`flex ${styles.logo_wrapper}`}>
          <ImageView src={assets.img_logo} alt={"logo"} imgHeight={29} />
        </section>
        <section className={`flex ${styles.language_section}`}>
          <section className={`flex ${styles.language_wrapper}`}>
            <ImageView src={assets.ic_world} alt="world-icon" imgSize={24} />
            <h5 className={`medium ${styles.language_text}`} onClick={toggle}>
              Language
            </h5>
            <ImageView src={assets.ic_down_arrow} alt="down-arrow" imgSize={20} />
          </section>
          <section className={`flex ${styles.help_wrapper}`}>
            <ImageView src={assets.ic_help} alt="help-icon" imgSize={24} />
            <h5 className={`medium ${styles.language_text}`}>Help</h5>
          </section>
          {!bellIcon && <ImageView src={assets.ic_alert} alt="help-icon" imgSize={24} />}
          {!profile && (
            <section className={styles.profile_wrapper}>
              {first_name?.charAt(0).toUpperCase()}
              {last_name?.charAt(0).toUpperCase()}
            </section>
          )}
        </section>
        {!!addButton && (
          <h3 onClick={onAdd} className={styles.add_text}>
            {addButton}
          </h3>
        )}
      </header>
      <section className={styles.main_wrapper}>
        {isDesktop ? (
          <>
            {!isStepper && <nav className={`flex-col ${styles.nav_container}`}>{SIDE_BAR.map(renderSideBar)}</nav>}
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
                <Button
                  onClick={onBack}
                  wrapperClass={styles.skip_btn}
                  buttonType="primary-outlined"
                  leadingIcon={assets.ic_left_arrow_fill}>
                  {skipBtn}
                </Button>
                <Button
                  onClick={onSubmit}
                  wrapperClass={styles.button_wrapper}
                  trailingIcon={assets.ic_right_arrow_fill}
                  trailingClass={styles.tail_class}>
                  {buttonText}
                </Button>
              </>
            )}
          </section>
          {footerChild}
        </footer>
      )}
    </>
  )
}

"use client"

import {Button, ImageView, assets as projectAssets, usePopup} from "@fanam-pkg/core-ui-sass"
import {useResize} from "@fanam-pkg/core-utils"
import {useRouter} from "next/navigation"
import assets from "assets"
import {useCommon, useSingleton} from "hooks"
import {IStepper} from "model"
import {ProfileDetails, SidePanel} from "organisms"
import {BaseContainerProps} from "props"
import {SIDE_BAR} from "utils"
import {useHandler} from "./handler"
import styles from "./style.module.sass"

export const BaseContainer = ({
  children,
  footerChild,
  buttonText,
  onBack,
  childWrapper,
  skipBtn,
  cancelBtn,
  stepIndex,
  profile,
  bellIcon,
  onSubmit,
  onCancel,
  isStepper = false,
  disabled = false,
}: BaseContainerProps) => {
  const {user, bankName} = useSingleton()
  const {AZURE_BASE_URL} = useCommon()
  const {first_name, last_name} = user || {}
  const {isDesktop} = useResize()
  const {back} = useRouter()
  const {togglePopup} = usePopup()
  const {sideNav, setSideNav} = useHandler()
  const bankStyles = {
    Hdfc_bank: styles.hdfc,
    Yes_bank: styles.yes,
    City_union_bank: styles.union,
    Sbi_bank: styles.sbi,
    Icici_bank: styles.icici,
  }

  const logoUrl = `${AZURE_BASE_URL}icon-96x96.png`

  const onClickBack = () => {
    if (onBack) onBack()
    else back()
  }
  const handleProfile = () => {
    togglePopup({
      title: "Settings",
      children: <ProfileDetails />,
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
      <header className={`flex-sb-center ${styles.header_wrapper}  ${bankStyles[bankName] || ""}`}>
        <section className={`flex ${styles.logo_wrapper}`}>
          <ImageView src={logoUrl} alt={"logo"} imgWidth={isDesktop ? 150 : 120} imgHeight={70} />
        </section>
        <section className={`flex ${styles.language_section}`}>
          <section className={`flex ${styles.language_wrapper}`}>
            <ImageView src={isDesktop ? assets.ic_world : assets.ic_country} alt="world-icon" imgSize={24} />
            <h5 className={`medium ${styles.language_text}`}>Language</h5>
            <ImageView
              src={isDesktop ? assets.ic_down_arrow : projectAssets.ic_black_arrow}
              alt="down-arrow"
              imgSize={20}
            />
          </section>
          {isDesktop ? (
            <>
              <section className={`flex ${styles.help_wrapper}`}>
                <ImageView src={assets.ic_help} alt="help-icon" imgSize={24} />
                <h5 className={`medium ${styles.language_text}`}>Help</h5>
              </section>
              {!bellIcon && <ImageView src={assets.ic_alert} alt="help-icon" imgSize={24} />}

              {!profile && (
                <section
                  className={`${styles.profile_wrapper}  ${bankStyles[bankName] || ""}  `}
                  onClick={handleProfile}>
                  {first_name?.charAt(0).toUpperCase()}
                  {last_name?.charAt(0).toUpperCase()}
                </section>
              )}
            </>
          ) : (
            <ImageView src={assets.ic_menu} alt="menu-icon" imgSize={24} onClick={setSideNav.bind(null, !sideNav)} />
          )}
        </section>
      </header>
      {sideNav && <SidePanel />}
      {isDesktop ? (
        isStepper ? (
          <section className={`flex-start ${styles.children_wrapper}`}>
            <nav className={`flex-col ${styles.nav_container}`}>{SIDE_BAR.map(renderSideBar)}</nav>
            <section className={childWrapper}>{children}</section>
          </section>
        ) : (
          <section className={`${childWrapper} ${styles.children_wrapper}`}>{children}</section>
        )
      ) : (
        <section className={styles.mobile_wrapper}>{children}</section>
      )}

      {(buttonText || skipBtn || cancelBtn || footerChild) && (
        <footer className={`flex ${styles.footer_wrapper}`}>
          {footerChild}
          {skipBtn && (
            <Button
              onClick={onClickBack}
              wrapperClass={styles.skip_btn}
              buttonType="primary-outlined"
              leadingIcon={assets.ic_left_arrow_fill}>
              {skipBtn}
            </Button>
          )}
          {cancelBtn && (
            <Button
              onClick={onCancel}
              wrapperClass={styles.skip_btn}
              trailingClass={styles.tail_class}
              buttonType="primary-outlined">
              {cancelBtn}
            </Button>
          )}
          {buttonText && (
            <Button
              onClick={onSubmit}
              wrapperClass={`${styles.button_wrapper} ${disabled ? styles.disable_btn : ""}  `}
              trailingIcon={assets.ic_right_arrow_fill}
              trailingClass={styles.tail_class}
              disabled={disabled}>
              {buttonText}
            </Button>
          )}
        </footer>
      )}
    </>
  )
}

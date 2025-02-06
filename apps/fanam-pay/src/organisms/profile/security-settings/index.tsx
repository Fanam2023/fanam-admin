import {ImageView, useDialog, usePopup} from "@fanam-pkg/core-ui-sass"
import {useTranslation} from "react-i18next"
import {useRouter} from "next/navigation"
import {TypeSignOut} from "@custom/utils"
import assets from "assets"
import {useSingleton} from "hooks"
import {ProfileNavItemProps} from "props"
import {ROUTE_FORGOT_PIN, SECURITY_ARR} from "utils"
import styles from "./styles.module.sass"

export const SecuritySettings = () => {
  const {toggleDialog} = useDialog()
  const {togglePopup} = usePopup()
  const {signOutUser} = useSingleton()
  const {replace} = useRouter()
  const {t} = useTranslation()

  const showActionPopup = (actionText: string, message: string, type: TypeSignOut) => {
    toggleDialog({
      primaryButtonText: actionText,
      secondaryButtonText: "Cancel",
      message,
      onClickPrimary: async () => {
        if (type === "forgot-pin") {
          replace(ROUTE_FORGOT_PIN)
        } else {
          signOutUser(type)
        }
        togglePopup()
      },
    })
  }

  const onClickAction = (label: string) => {
    togglePopup()
    switch (label) {
      case "Change PIN":
        showActionPopup("Change PIN", "Are you sure you want to reset/change your PIN?", "forgot-pin")
        break
      case "Change Email":
        break
      case "Log Out":
        showActionPopup("Logout", "Are you sure you want to logout?", "logout")
        break
      case "Log Out of all devices":
        showActionPopup("Logout", "Are you sure you want to logout from all the active devices?", "logout-all")
        break
      default:
        null
    }
  }

  const renderSecurity = ({label, icon}: ProfileNavItemProps, index: number) => (
    <li className={`flex ${styles.wrapper}`} key={index}>
      <ImageView src={icon} imgSize={28} alt={label} wrapperClass={styles.icon_wrapper} />
      <p className={styles.security_name}>{t(label)}</p>
      <ImageView
        src={assets.ic_blue_arrow}
        imgSize={24}
        alt="arrow"
        wrapperClass={styles.arrow_wrapper}
        onClick={() => onClickAction(label)}
      />
    </li>
  )

  return (
    <section>
      <h4 className={`bold ${styles.title}`}>{t("Privacy & Security")}</h4>
      <ul className={`flex-col ${styles.security_wrapper}`}>{SECURITY_ARR.map(renderSecurity)}</ul>
    </section>
  )
}

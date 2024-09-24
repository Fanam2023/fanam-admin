import {ImageView, useDialog, usePopup} from "@fanam-pkg/core-ui-sass"
import {useRouter} from "next/navigation"
import assets from "assets"
import {useSingleton} from "hooks"
import {ProfileNavItemProps} from "props"
import {ROUTE_FORGOT_PIN, SECURITY_ARR} from "utils"
import styles from "./styles.module.sass"

export const SecuritySettings = () => {
  const {push} = useRouter()
  const {toggleDialog} = useDialog()
  const {togglePopup} = usePopup()
  const {singOutUser} = useSingleton()

  const handleLogoutClick = (isSignOutFromAllDevices = false, callback?: () => void) => {
    const onConfirm = () => {
      singOutUser(isSignOutFromAllDevices)
      if (callback) callback()
      toggleDialog()
    }

    const onClose = () => toggleDialog()

    toggleDialog({
      primaryButtonText: "Logout",
      secondaryButtonText: "Cancel",
      message: "Are you sure you want to logout?",
      onClickPrimary: onConfirm,
      onClickSecondary: onClose,
    })
  }
  const handleSecurityClick = (label: string) => {
    togglePopup()
    switch (label) {
      case "Change PIN":
        handleLogoutClick(false, () => push(ROUTE_FORGOT_PIN))
        break
      case "Change Email":
        break
      case "Log Out":
        handleLogoutClick(false, () => singOutUser(false))
        break
      case "Log Out of all devices":
        handleLogoutClick(false, () => singOutUser(true))
        break
      default:
        null
    }
  }
  const renderSecurity = ({label, icon}: ProfileNavItemProps, index: number) => (
    <li className={`flex ${styles.wrapper}`} key={index}>
      <ImageView src={icon} imgSize={28} alt={label} wrapperClass={styles.icon_wrapper} />
      <p className={styles.security_name}>{label}</p>
      <ImageView
        src={assets.ic_blue_arrow}
        imgSize={24}
        alt={""}
        wrapperClass={styles.arrow_wrapper}
        onClick={() => handleSecurityClick(label)}
      />
    </li>
  )

  return (
    <section>
      <h4 className={`bold ${styles.title}`}>Privacy & Security</h4>
      <ul className={`flex-col ${styles.security_wrapper}`}>{SECURITY_ARR.map(renderSecurity)}</ul>
    </section>
  )
}

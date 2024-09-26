import {assets, ImageView} from "@fanam-pkg/core-ui-sass"
import {useState} from "react"
import {Notify, PersonalInformation, SecuritySettings} from "organisms"
import {ProfileNavItemProps} from "props"
import {PROFILE_ARR} from "utils"
import styles from "./style.module.sass"

export const SidePanel = () => {
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null)

  const renderContent = () => {
    switch (selectedLabel) {
      case "Profile":
        return <PersonalInformation />
      case "Security Settings":
        return <SecuritySettings />
      case "Notification":
        return <Notify />
      default:
        return <ul className={`flex-col ${styles.profile_wrapper}`}>{PROFILE_ARR.map(renderProfileContent)}</ul>
    }
  }

  const renderProfileContent = ({icon, label}: ProfileNavItemProps) => (
    <li key={label} className={styles.list_wrapper} onClick={() => setSelectedLabel(label)}>
      <ImageView src={icon} imgSize={24} alt={label} />
      <h4 className={styles.nav_item}>{label}</h4>
      <ImageView src={assets.ic_black_arrow} wrapperClass={styles.back_arrow} imgSize={24} alt="back arrow" />
    </li>
  )

  return (
    <section className={styles.profile_container}>
      {selectedLabel ? (
        <section className={styles.content_wrapper}>
          <ImageView
            src={assets.ic_close}
            imgSize={24}
            className={styles.back_button}
            onClick={() => setSelectedLabel(null)}
            alt="close"
          />
          <section className={styles.content_container}>{renderContent()}</section>
        </section>
      ) : (
        <ul className={`flex-col ${styles.profile_wrapper}`}>{PROFILE_ARR.map(renderProfileContent)}</ul>
      )}
    </section>
  )
}

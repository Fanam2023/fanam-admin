import {ImageView} from "@fanam-pkg/core-ui-sass"
import assets from "assets"
import styles from "./styles.module.sass"

export const BaseContainer = () => {
  return (
    <section className={`flex-col ${styles.nav_container}`}>
      <section className={`flex`}>
        <ImageView src={assets.ic_icon} alt={"Logo"} imgSize={38} />
        <h3 className={styles.f_wrapper}> Fanam</h3>
        <h3 className={styles.txt_wrapper}> Assist</h3>
      </section>
      <section className={`flex ${styles.chat_wrapper}`}>
        <ImageView src={assets.ic_plus} alt={"Logo"} imgSize={24} />
        <h5> Create Chat</h5>
      </section>
    </section>
  )
}

import {ImageView} from "@fanam-pkg/core-ui-sass"
import assets from "assets"
import {LogIn} from "organisms"
import styles from "./styles.module.sass"

export const FlashScreen = () => {
  return (
    <section className={`flex `}>
      <section className={`flex-center ${styles.banner_wrapper}`}>
        <section className={styles.content_wrapper}>
          <ImageView src={assets.ic_compliance} alt={""} imgSize={280} />
          <h2>Welcome to Compliance Safeguard</h2>
          <h4>Navigating Complex Regulatory Landscapes with Ease</h4>
        </section>
      </section>
      <LogIn />
    </section>
  )
}

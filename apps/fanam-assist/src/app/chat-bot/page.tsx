import {ImageView} from "@fanam-pkg/core-ui-sass"
import assets from "assets"
import {BaseContainer} from "organisms/base-conatiner"
import styles from "./page.module.sass"
import {Topics} from "./topics"

export const ChatBot = () => {
  return (
    <section className={`flex ${styles.page_conatiner}`}>
      <BaseContainer />
      <section className={`flex-col-center ${styles.head_wrapper}`}>
        <section className={`flex ${styles.header_wrapper}`}>
          <section>
            <h2 className={styles.name_wrapper}>Hello Jhon</h2>
            <h5>
              Welcome to Compliance Safeguard: Your guide to regulatory compliance. We provide accurate, timely
              information to help you understand and meet key requirements.
            </h5>
          </section>
          <ImageView src={assets.ic_icon} alt={"Profile"} imgSize={24} />
        </section>
        <Topics />
        <section className={`flex-col-center ${styles.chat_wrapper}`}>
          <section className={`flex-sb-row ${styles.input_wrapper}`}>
            <h5>Ask me a question</h5>
            <ImageView src={assets.ic_send} alt={"Send"} imgSize={24} className={styles.img_wrapper} />
          </section>
        </section>
      </section>
    </section>
  )
}

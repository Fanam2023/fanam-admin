import {RecipientInfo} from "props"
import {RECIPIENT_INFO} from "utils"
import styles from "./styles.module.sass"

export const RecipientDetails = () => {
  const renderRecipientDetails = ({label, value}: RecipientInfo, index: number) => (
    <section key={index} className={`flex ${styles.recipient}`}>
      <h5 className={styles.header}>{label}</h5>
      <h5 className={`semi-bold ${styles.detail}`}>{value}</h5>
    </section>
  )

  return (
    <section className={`flex-col ${styles.recipient_detail}`}>
      <h4 className={`bold ${styles.txt_wrapper}`}>Recipient Details</h4>
      <ul>{RECIPIENT_INFO.map(renderRecipientDetails)}</ul>
    </section>
  )
}

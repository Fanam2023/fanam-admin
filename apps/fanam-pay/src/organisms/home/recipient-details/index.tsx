import {IFormData} from "@fanam-pkg/core-utils"
import {ITransactionProps} from "props"
import styles from "./styles.module.sass"

export const RecipientDetails = ({recipientData}: ITransactionProps) => {
  const renderRecipientDetails = ({label, key}: IFormData, index: number) => (
    <section key={index} className={`flex ${styles.recipient}`}>
      <h5 className={styles.header}>{key}</h5>
      <h5
        className={`semi-bold ${styles.detail} ${key === "First Name" || key === "Last Name" ? styles.detail_container : ""}`}>
        {label}
      </h5>
    </section>
  )

  return (
    <section className={`flex-col ${styles.recipient_detail}`}>
      <h4 className={`bold ${styles.txt_wrapper}`}>Recipient Details</h4>
      <ul>{recipientData?.map(renderRecipientDetails)}</ul>
    </section>
  )
}

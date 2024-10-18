import {IFormData} from "@fanam-pkg/core-utils"
import {ITransactionProps} from "props"
import styles from "./styles.module.sass"

export const RecipientDetails = ({recipientData}: ITransactionProps) => {
  const renderRecipientDetails = ({label, key}: IFormData, index: number) => (
    <section key={index} className={` ${styles.recipient}`}>
      <h6 className={styles.header}>{key}</h6>
      <h6
        className={`semi-bold ${styles.detail} ${key === "First Name" || key === "Last Name" || key === "Account Holder" ? styles.detail_container : ""}`}>
        {label}
      </h6>
    </section>
  )

  return (
    <section className={`${styles.recipient_detail}`}>
      <h4 className={`bold ${styles.txt_wrapper}`}>Recipient Details</h4>
      <ul>{recipientData?.map(renderRecipientDetails)}</ul>
    </section>
  )
}

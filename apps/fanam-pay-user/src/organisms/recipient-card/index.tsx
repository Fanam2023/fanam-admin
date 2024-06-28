import {ImageView} from "@fanam-pkg/core-ui-sass"
import assets from "assets"
import {RecipientCardProps, RecipientPreviewProps} from "props"
import {RECIPIENT_DETAILS} from "utils"
import styles from "./styles.module.sass"

export const RecipientCard = ({onEdit}: RecipientCardProps) => {
  const renderRecipientDetails = ({label, value}: RecipientPreviewProps, index: number) => (
    <li className={`flex-sb-center ${styles.data_wrapper}`} key={index}>
      <h5 className={styles.field_wrapper}>{label}</h5>
      <h5>{value}</h5>
    </li>
  )

  return (
    <section className={`flex-col ${styles.container_wrapper}`}>
      <section className={`flex-sb-center ${styles.card_wrapper}`}>
        <h5 className={styles.title_wrapper}>Recipient Details</h5>
        <ImageView
          wrapperClass={styles.edit_icon}
          src={assets.ic_edit}
          alt="edit-icon"
          imgSize={24}
          onClick={onEdit.bind(null, null)}
        />
      </section>
      <ul>{RECIPIENT_DETAILS.map(renderRecipientDetails)}</ul>
    </section>
  )
}

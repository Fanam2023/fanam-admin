import {ImageView} from "@fanam-pkg/core-ui-sass"
import {IFormData} from "@fanam-pkg/core-utils"
import assets from "assets"
import {RecipientCardProps} from "props"
import {useHandler} from "./handler"
import styles from "./styles.module.sass"

export const RecipientCard = ({onEdit}: RecipientCardProps) => {
  const {recipientDetails, recipientAccountDetails} = useHandler()
  const renderRecipientDetails = ({key, label}: IFormData, index: number) => (
    <li className={`flex-sb-center ${styles.data_wrapper}`} key={index}>
      <h5 className={styles.field_wrapper}>{key}</h5>
      <h5>{label}</h5>
    </li>
  )

  return (
    <>
      <section className={`flex-col ${styles.details_wrapper}`}>
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
        <ul>{recipientDetails.map(renderRecipientDetails)}</ul>
      </section>
      <section className={`flex-col ${styles.account_wrapper}`}>
        <section className={`flex-sb-center ${styles.card_wrapper}`}>
          <h5 className={styles.title_wrapper}>Recipient Account Details</h5>
          <ImageView
            wrapperClass={styles.edit_icon}
            src={assets.ic_edit}
            alt="edit-icon"
            imgSize={24}
            onClick={onEdit.bind(null, null)}
          />
        </section>
        <ul>{recipientAccountDetails.map(renderRecipientDetails)}</ul>
      </section>
    </>
  )
}

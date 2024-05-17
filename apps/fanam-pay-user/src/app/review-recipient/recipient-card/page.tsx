import {ImageView} from "@fanam-pkg/core-ui-sass"
import assets from "assets"
import {RecepiantPreviewProps} from "props"
import {ACCOUNTDETAILS, RECIPIENTDETAILS} from "utils"
import styles from "./card.module.sass"

const RecipientCard = () => {
  const renderRecipentDetails = ({name, data}: RecepiantPreviewProps, index: number) => (
    <section className={`flex-sb-center ${styles.data_wrapper}`} key={index}>
      <h5 className={styles.field_wrapper}>{name}</h5>
      <h5 className={styles.field_wrapper}>{data}</h5>
    </section>
  )
  return (
    <section>
      <section className={styles.border_wrapper}>
        <section className={`flex-sb-center ${styles.card_wrapper}`}>
          <h5 className={styles.tittle_wrapper}>Recipient Details</h5>
          <ImageView className={styles.edit_icon} src={assets.ic_edit} alt="" imgSize={24} />
        </section>
        <ul>{RECIPIENTDETAILS.map(renderRecipentDetails)}</ul>
      </section>
      <section className={styles.border_wrapper}>
        <section className={`flex-sb-center ${styles.card_wrapper}`}>
          <h5 className={styles.tittle_wrapper}>Recipient Account Details</h5>
          <ImageView className={styles.edit_icon} src={assets.ic_edit} alt="" imgSize={24} />
        </section>
        <ul>{ACCOUNTDETAILS.map(renderRecipentDetails)}</ul>
      </section>
    </section>
  )
}
export default RecipientCard

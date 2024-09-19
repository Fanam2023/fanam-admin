import {ImageView} from "@fanam-pkg/core-ui-sass"
import {IFormData} from "@fanam-pkg/core-utils"
import assets from "assets"
import {BeneficiaryCardProps} from "props"
import {useHandler} from "./handler"
import styles from "./styles.module.sass"

export const BeneficiaryCard = ({onEdit}: BeneficiaryCardProps) => {
  const {beneficiaryDetails, beneficiary_id} = useHandler()

  const renderRecipientDetails = ({key, label}: IFormData, index: number) => (
    <li className={styles.data_wrapper} key={index}>
      <h5 className={styles.field_wrapper}>{key}</h5>
      <h5 className={`bold ${styles.detail_wrapper}`}>{label}</h5>
    </li>
  )

  return (
    <section className={styles.page_wrapper}>
      <h5 className={`bold ${styles.heading}`}>Beneficiary</h5>
      <section className={`flex-col ${styles.details_wrapper}`}>
        <section className={`flex-sb-center ${styles.card_wrapper}`}>
          <h5 className={styles.title_wrapper}>Beneficiary Details</h5>
          <ImageView
            wrapperClass={styles.edit_icon}
            src={assets.ic_more}
            alt="edit-icon"
            imgSize={18}
            onClick={onEdit.bind(null, beneficiary_id)}
          />
        </section>
        <ul className={`flex-col ${styles.details}`}>{beneficiaryDetails?.map(renderRecipientDetails)}</ul>
      </section>
    </section>
  )
}

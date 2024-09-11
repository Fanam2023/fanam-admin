import {Checkbox, DropDown, ImageView} from "@fanam-pkg/core-ui-sass"
import {IFormData} from "@fanam-pkg/core-utils"
import assets from "assets"
import {RecipientCardProps} from "props"
import {RELATION_SHIP} from "utils"
import {useHandler} from "./handler"
import styles from "./styles.module.sass"

export const RecipientCard = ({onEdit, isSame, isPerson, onChangeData, relation, error}: RecipientCardProps) => {
  const {recipientDetails, recipient_id} = useHandler()

  const renderRecipientDetails = ({key, label}: IFormData, index: number) => (
    <li className={`flex-sb-center ${styles.data_wrapper}`} key={index}>
      <h5 className={styles.field_wrapper}>{key}</h5>
      <h5>{label}</h5>
    </li>
  )

  return (
    <section className={styles.page_wrapper}>
      <h5 className="bold">Recipient</h5>
      <section className={`flex-col ${styles.details_wrapper}`}>
        <section className={`flex-sb-center ${styles.card_wrapper}`}>
          <h5 className={styles.title_wrapper}>Recipient Details</h5>
          <ImageView
            wrapperClass={styles.edit_icon}
            src={assets.ic_more}
            alt="edit-icon"
            imgSize={18}
            onClick={onEdit.bind(null, recipient_id)}
          />
        </section>
        <ul>{recipientDetails.map(renderRecipientDetails)}</ul>
        <section>
          <section className={`flex ${styles.check_box_wrapper}`}>
            <Checkbox item={isPerson} name="is_same_person" onSelectItem={onChangeData} />
            <h5 className={styles.text}>Are the recipient and the beneficiary the same</h5>
          </section>
          {isSame && (
            <DropDown
              label="Select Relationship with Recipient"
              options={RELATION_SHIP}
              onChangeData={onChangeData}
              name="recipient_relationship"
              selected={relation}
              wrapperClass={styles.drop_down}
              error={error}
            />
          )}
        </section>
      </section>
    </section>
  )
}

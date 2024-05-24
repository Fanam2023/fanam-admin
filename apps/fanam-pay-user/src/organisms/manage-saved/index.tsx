import {ImageView, TextField} from "@fanam-pkg/core-ui-sass"
import {Fragment} from "react"
import assets from "assets"
import {Recipients, RecipientsProps} from "props"
import styles from "./style.module.sass"

export const ManageSaved = ({title, recipients, placeHolderName, onChangeSearch}: RecipientsProps) => {
  const renderUserData = ({email, name}: Recipients, index: number) => (
    <section className={`flex ${styles.beneficiary_wrapper}`} key={index}>
      <ImageView src={assets.ic_user} alt={"user-profile"} imgSize={46} />
      <section className={`flex-sb-center ${styles.user_wrapper}`}>
        <section className={`flex-col ${styles.user_details}`}>
          <h3>{name}</h3>
          <h5>{email}</h5>
        </section>
        <ImageView src={assets.ic_profile_edit} alt={"edit-icon"} imgSize={24} />
      </section>
    </section>
  )

  return (
    <Fragment>
      <TextField
        type="text"
        placeholder={placeHolderName}
        wrapperClass={styles.search_wrapper}
        leadingIcon={assets.ic_search}
        onChangeData={onChangeSearch}></TextField>
      <section className={`flex-col ${styles.beneficiary_container}`}>
        <h3>{title}</h3>
        {recipients?.map(renderUserData)}
      </section>
    </Fragment>
  )
}

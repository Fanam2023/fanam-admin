import {ImageView, TextField} from "@fanam-pkg/core-ui-sass"
import {Fragment} from "react"
import assets from "assets"
import {IBeneficiary, IRecipients} from "model"
import {ManageMembersProps} from "props"
import styles from "./style.module.sass"

export const ManageMembers = ({title, recipients, placeHolderName, onChangeSearch}: ManageMembersProps) => {
  const renderUserData = (recipient: IRecipients | IBeneficiary, index: number) => {
    const {name, profileIcon} = recipient

    return (
      <section className={`flex ${styles.beneficiary_wrapper}`} key={index}>
        <ImageView src={profileIcon} alt={"user-profile"} imgSize={46} />
        <section className={`flex-sb-center ${styles.user_wrapper}`}>
          <section className={`flex-col ${styles.user_details}`}>
            <h3>{name}</h3>
            {"email" in recipient ? <h5>{recipient.email}</h5> : <h5>{recipient.accountNumber}</h5>}
          </section>
          <ImageView src={assets.ic_edit_theme} alt={"edit-icon"} imgSize={24} />
        </section>
      </section>
    )
  }

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

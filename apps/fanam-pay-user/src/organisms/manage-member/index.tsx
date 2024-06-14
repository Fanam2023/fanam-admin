"use client"

import {ImageView, TextField} from "@fanam-pkg/core-ui-sass"
import {useResize} from "@fanam-pkg/core-utils"
import assets from "assets"
import {ManageMembersProps, MemberProps} from "props"
import styles from "./style.module.sass"

export const ManageMembers = ({
  title,
  recipients,
  placeHolderName,
  onChangeSearch,
  onAddButton,
}: ManageMembersProps) => {
  const {isDesktop} = useResize()

  const renderUserData = ({title, description}: MemberProps, index: number) => (
    <section className={`flex ${styles.beneficiary_wrapper}`} key={index}>
      <ImageView src={assets.ic_user} alt={"user-profile"} imgSize={46} />
      <section className={`flex-sb-center ${styles.user_wrapper}`}>
        <section className={`flex-col ${styles.user_details}`}>
          <h3>{title}</h3>
          <h5>{description}</h5>
        </section>
        <ImageView src={assets.ic_edit_theme} alt={"edit-icon"} imgSize={24} wrapperClass={styles.edit_icon} />
      </section>
    </section>
  )

  return (
    <section className={`flex-col-center ${styles.container}`}>
      <section className={`flex-sb-center ${styles.search_container}`}>
        <TextField
          type="text"
          placeholder={placeHolderName}
          wrapperClass={styles.search_wrapper}
          leadingIcon={assets.ic_search}
          onChangeData={onChangeSearch}></TextField>
        {isDesktop && (
          <h4 className={styles.add_text} onClick={onAddButton}>
            Add
          </h4>
        )}
      </section>
      <section className={`flex-col ${styles.beneficiary_container}`}>
        <h3>{title}</h3>
        {recipients?.map(renderUserData)}
      </section>
    </section>
  )
}

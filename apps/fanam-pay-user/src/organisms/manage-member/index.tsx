"use client"

import {ImageView} from "@fanam-pkg/core-ui-sass"
import {MouseEvent} from "react"
import assets from "assets"
import {ManageMembersProps} from "props"
import styles from "./style.module.sass"

export const ManageMembers = ({title, onEdit, onSelect, description}: ManageMembersProps) => {
  const onClick = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    onSelect()
  }

  const onClickEdit = (e: MouseEvent<HTMLDivElement | HTMLImageElement>) => {
    e.stopPropagation()
    onEdit()
  }

  return (
    <section className={`flex-col-center ${styles.container}`} onClick={onClick}>
      <section className={`flex-col ${styles.beneficiary_container}`}>
        <section className={`flex ${styles.beneficiary_wrapper}`}>
          <ImageView src={assets.ic_user} alt={"user-profile"} imgSize={46} wrapperClass={styles.user_img} />
          <section className={`flex-sb-center ${styles.user_wrapper}`}>
            <section className={`flex-col ${styles.user_details}`}>
              <h3>{title}</h3>
              <h5>{description}</h5>
            </section>
            <ImageView
              src={assets.ic_edit_theme}
              alt={"edit-icon"}
              imgSize={24}
              wrapperClass={styles.edit_icon}
              onClick={onClickEdit}
            />
          </section>
        </section>
      </section>
    </section>
  )
}

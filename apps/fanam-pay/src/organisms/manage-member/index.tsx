"use client"

import {ImageView} from "@fanam-pkg/core-ui-sass"
import {MouseEvent} from "react"
import assets from "assets"
import {useCommon} from "hooks"
import {ManageMembersProps} from "props"
import styles from "./style.module.sass"

export const ManageMembers = ({title, onEdit, onSelect, description}: ManageMembersProps) => {
  const {getFirstLetter} = useCommon()
  const onClick = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    onSelect()
  }

  const onClickEdit = (e: MouseEvent<HTMLDivElement | HTMLImageElement>) => {
    e.stopPropagation()
    onEdit()
  }

  return (
    <section className={`${styles.card_wrapper}`} onClick={onClick}>
      <ImageView
        src={assets.ic_edit}
        alt="profile-image"
        imgSize={15}
        wrapperClass={styles.edit}
        onClick={onClickEdit}
      />
      <section className="flex-col-center">
        <section className={`flex-center ${styles.profile_wrapper}`}>
          <h4 className={`bold ${styles.title}`}>{getFirstLetter(title)}</h4>
        </section>
      </section>
      <h6 className={`ellipsis ${styles.user_details}`}>{title}</h6>
    </section>
  )
}

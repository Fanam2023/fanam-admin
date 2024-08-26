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

  const getFirstLetter = (title: string) => {
    const names = title.split(" ")
    const initials = names.map(name => name.charAt(0).toUpperCase())
    return initials
  }

  return (
    <section className={`${styles.card_wrapper}`} onClick={onClick}>
      <section className={styles.edit} onClick={onClickEdit}>
        <ImageView src={assets.ic_edit} alt="profile-image" imgSize={15} />
      </section>
      <section className="flex-col-center">
        <section className={styles.profile_wrapper}>
          <h4 className="bold">{getFirstLetter(title)}</h4>
        </section>
      </section>
      <section className={`${styles.user_details}`}>
        <h6 className={`ellipsis ${styles.user_name}`}>{title}</h6>
      </section>
    </section>
  )
}

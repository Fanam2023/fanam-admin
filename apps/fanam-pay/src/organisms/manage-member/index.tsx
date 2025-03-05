"use client"

import {ImageView} from "@fanam-pkg/core-ui-sass"
import {useResize} from "@fanam-pkg/core-utils"
import {MouseEvent} from "react"
import assets from "assets"
import {ManageMembersProps} from "props"
import styles from "./style.module.sass"

export const ManageMembers = ({title, onEdit, onSelect}: ManageMembersProps) => {
  const {isDesktop} = useResize()
  const truncateDescription = (text: string) => {
    const maxLength = isDesktop ? 10 : 12
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "..."
    }
    return text
  }
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
        imgSize={20}
        wrapperClass={styles.edit}
        onClick={onClickEdit}
      />
      <section className="flex-col-center">
        <section className={`flex-center ${styles.profile_wrapper}`}>
          <h4 className={`bold ${styles.title}`}>{title?.charAt(0)}</h4>
        </section>
      </section>
      <h6 className={`ellipsis ${styles.user_details}`}>{truncateDescription(title)}</h6>
      <h6 className={styles.user_name}>{title}</h6>
    </section>
  )
}

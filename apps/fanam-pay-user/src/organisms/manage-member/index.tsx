"use client"

import {ImageView} from "@fanam-pkg/core-ui-sass"
import {useResize} from "@fanam-pkg/core-utils"
import assets from "assets"
import {ManageMembersProps} from "props"
import styles from "./style.module.sass"

export const ManageMembers = ({title, onEdit, description}: ManageMembersProps) => {
  const {isDesktop} = useResize()

  return (
    <section className={`flex-col-center ${styles.container}`}>
      <section className={`flex-col ${styles.beneficiary_container}`}>
        <section className={`flex ${styles.beneficiary_wrapper}`}>
          <ImageView src={assets.ic_user} alt={"user-profile"} imgSize={46} />
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
              onClick={onEdit}
            />
          </section>
        </section>
      </section>
    </section>
  )
}

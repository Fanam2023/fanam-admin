"use client"

import {ImageView} from "@fanam-pkg/core-ui-sass"
import {useState} from "react"
import assets from "assets"
import {AccordianProps} from "props"
import styles from "./styles.module.sass"

export const Accordian = ({children, title, description, leadingIcon, tailingIcon, isFrequent}: AccordianProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <section className={"flex-col"}>
      <section className={`flex ${styles.container}`}>
        {isFrequent && (
          <section className={`flex ${styles.tag_wrapper}`}>
            <h6>Frequently used</h6>
            <ImageView src={assets.ic_star} alt="star-icon" imgSize={10} wrapperClass={styles.star_image} />
          </section>
        )}
        {leadingIcon && (
          <ImageView src={leadingIcon} alt="bank-icon" imgSize={25} wrapperClass={styles.bank_image}></ImageView>
        )}
        <section className={`flex ${styles.detail_container}`}>
          <section className={`flex-col ${styles.details_wrapper}`}>
            <h3>{title}</h3>
            <h4>{description}</h4>
          </section>
          {tailingIcon && (
            <ImageView
              src={isOpen ? assets.ic_up_arrow : assets.ic_black_arrow}
              alt="bank-icon"
              imgSize={isOpen ? 32 : 25}
              wrapperClass={styles.down_arrow}
              onClick={setIsOpen.bind(null, !isOpen)}></ImageView>
          )}
        </section>
      </section>
      {isOpen && <section className={`flex-col  ${isOpen ? styles.open : ""}`}>{children}</section>}
      <hr></hr>
    </section>
  )
}

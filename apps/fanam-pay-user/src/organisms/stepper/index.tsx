"use client"

import {useResize} from "@fanam-pkg/core-utils"
import {Fragment, useState} from "react"
import {IStepper} from "model"
import {StepperProps} from "props"
import {SIDE_BAR} from "utils"
import styles from "./style.module.sass"

export const Stepper = ({children}: StepperProps) => {
  const [selIndex, setSelIndex] = useState(3)
  const {isDesktop} = useResize()

  const renderSideBar = ({title, description}: IStepper, index: number) => {
    const isLastStep = index < SIDE_BAR.length - 1
    const isActive = index === selIndex
    const isCompleted = index < selIndex

    return (
      <section className={styles.content_wrapper} key={index}>
        <section className={`flex-col ${styles.stepper_container}`}>
          {isLastStep && (
            <section className={`${styles.progress_bar} ${isCompleted ? styles.progress_bar_completed : ""}`}></section>
          )}
          <h5 className={`${styles.stepper} ${isActive || isCompleted ? styles.active : ""}`}>{index + 1}</h5>
        </section>
        <section className={`flex-col ${styles.content}`}>
          <h5 className={`${isActive || isCompleted ? styles.active_title : styles.inactive_title}`}>{title}</h5>
          <h6 className={`${isActive || isCompleted ? styles.active_desc : styles.inactive_desc} `}>{description}</h6>
        </section>
      </section>
    )
  }

  return (
    <Fragment>
      {isDesktop ? (
        <section className={`${styles.wrapper}`}>
          <nav className={`flex-col ${styles.nav_container}`}>{SIDE_BAR.map(renderSideBar)}</nav>
          <section style={{width: "70%"}}>{children}</section>
        </section>
      ) : (
        <section>{children}</section>
      )}
    </Fragment>
  )
}

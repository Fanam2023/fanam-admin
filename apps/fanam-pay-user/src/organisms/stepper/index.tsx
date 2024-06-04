"use client"

import {useState} from "react"
import {IStepper} from "model"
import {SIDE_BAR} from "utils"
import styles from "./style.module.sass"

export const Stepper = () => {
  const [selIndex, setSelIndex] = useState(3)

  const onNext = () => {
    setSelIndex(prev => Math.min(prev + 1, SIDE_BAR.length - 1))
  }

  const onPrevious = () => {
    setSelIndex(prev => Math.max(prev - 1, 0))
  }

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

  return <nav className={`flex-col ${styles.nav_container}`}>{SIDE_BAR.map(renderSideBar)}</nav>
}

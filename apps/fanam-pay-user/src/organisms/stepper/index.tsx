"use client"

import {useState} from "react"
import {SideBarProp} from "props"
import {SIDE_BAR} from "utils"
import styles from "./style.module.sass"

export const Stepper = () => {
  const [currentStep, setCurrentStep] = useState(3)

  const handleNext = () => {
    setCurrentStep(prev => Math.min(prev + 1, SIDE_BAR.length - 1))
  }

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0))
  }

  const renderSideBar = ({title, description}: SideBarProp, index: number) => {
    const isLastStep = index < SIDE_BAR.length - 1
    const isActive = index === currentStep
    const isCompleted = index < currentStep

    return (
      <section className={styles.content_wrapper} key={index}>
        <section className={`flex-col ${styles.stepper_container}`}>
          {isLastStep && (
            <section className={`${styles.progress_bar} ${isCompleted ? styles.progress_bar_completed : ""}`}></section>
          )}
          <h5 className={`${styles.stepper} ${isActive || isCompleted ? styles.active : ""}`}>{index + 1}</h5>
        </section>
        <section className={`flex-col ${styles.content}`}>
          <h5 className={`${isActive || isCompleted ? styles.active_title_text : styles.inactive_title_text}`}>
            {title}
          </h5>
          <h6 className={`${isActive || isCompleted ? styles.active_desc_text : styles.inactive_desc_text} `}>
            {description}
          </h6>
        </section>
      </section>
    )
  }

  return (
    <section className={`flex ${styles.main_container}`}>
      <nav className={styles.navbar}>{SIDE_BAR.map(renderSideBar)}</nav>
    </section>
  )
}

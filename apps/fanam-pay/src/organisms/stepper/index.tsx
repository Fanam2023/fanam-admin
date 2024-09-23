import {useEffect, useState} from "react"
import {StepperProp} from "props"
import styles from "./styles.module.sass"

export const Stepper = ({status}: StepperProp) => {
  const [currentStep, setCurrentStep] = useState(0)

  const STEP_ARRAY = [
    {
      title: "KYC Verification In Pending",
    },
    {
      title: "KYC Verification Completed",
    },
  ]

  useEffect(() => {
    switch (status) {
      case "pending":
        setCurrentStep(0)
        break
      case "success":
        setCurrentStep(1)
        break
      default:
        break
    }
  }, [status])

  const renderItems = ({title}, index: number) => {
    const isActive = index === currentStep
    const isCompleted = typeof currentStep === "number" ? index < currentStep : STEP_ARRAY.length - 1 === index
    return (
      <section key={index} className={`flex-col ${styles.wrapper}`}>
        <h5
          className={`${styles.stepper} ${
            isCompleted
              ? styles.completed
              : isActive && currentStep === 1
                ? styles.active
                : isActive && currentStep === 0
                  ? styles.pending
                  : ""
          }`}>
          {isCompleted ? (
            <span>&#10003;</span>
          ) : isActive && currentStep === 0 ? (
            <span className={styles.greenDot}></span>
          ) : isActive && currentStep === 1 ? (
            <span>&#10003;</span>
          ) : (
            ""
          )}
        </h5>
        <h5 className={`${isActive || isCompleted ? styles.active_title : styles.inactive_title}`}>{title}</h5>
      </section>
    )
  }

  return (
    <section className={styles.stepper_container}>
      <ul className={styles.step_wrapper}>
        {STEP_ARRAY.map(renderItems)}
        <section className={styles.progress_bar_container}>
          {STEP_ARRAY.slice(0, -1).map((_, index) => (
            <div
              key={index}
              className={`${styles.progress_bar} ${index < currentStep ? styles.progress_bar_completed : ""}`}
            />
          ))}
        </section>
      </ul>
    </section>
  )
}

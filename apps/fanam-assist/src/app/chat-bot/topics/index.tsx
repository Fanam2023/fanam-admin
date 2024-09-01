"use client"

import {ITopics} from "model.ts/topic"
import {useHandler} from "./handler"
import styles from "./styles.module.sass"

const {defaultData} = useHandler()

const Card = ({tittle, description, className = ""}: ITopics & {className?: string}) => (
  <section className={`${styles.card_wrapper} ${className}`}>
    <h5 className={styles.title_wrapper}>{tittle}</h5>
    <span className={styles.description_wrapper}>{description}</span>
  </section>
)

export const Topics = () => {
  return (
    <section className={`flex-col-center ${styles.page_wrapper}`}>
      <Card {...defaultData[0]} className={styles.first_card_wrapper} />
      <section className={styles.grid_container}>
        {defaultData.slice(1).map((data, index) => (
          <Card key={index} {...data} />
        ))}
      </section>
    </section>
  )
}

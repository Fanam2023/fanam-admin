"use client"

import {Button, ImageView} from "@fanam-pkg/core-ui-sass"
import Link from "next/link"
import assets from "assets"
import {BaseContainer, ExchangeRate, ListTransaction} from "organisms"
import {ROUTE_RECIPIENTS, ROUTE_SENDER} from "utils"
import useHandler from "./handler"
import styles from "./page.module.sass"

const HomeScreen = () => {
  const {status, first_name, push} = useHandler()

  return (
    <BaseContainer childWrapper={styles.page_container} buttonText="Next" skipBtn="Back">
      <section className={styles.page_wrapper}>
        <section className={`flex ${styles.name_wrapper}`}>
          <h2>Good Afternoon,</h2>
          <h2 className={styles.first_name}>{first_name}</h2>
        </section>
        <h5>Discover how your currency has been tracking with our exchange rate charts.</h5>
        <section className={`flex ${styles.nav_wrapper}`}>
          <ImageView src={assets.ic_money} alt="money-icon" imgSize={32} />
          <h3>Send your money instantly and effortlessly</h3>
          {status === "Active" ? (
            <Link href={ROUTE_RECIPIENTS}>
              <Button wrapperClass={styles.button_wrapper}>Send Money</Button>
            </Link>
          ) : (
            <Button
              wrapperClass={styles.danger_button}
              buttonType="primary-outlined"
              onClick={() => push(ROUTE_SENDER)}>
              Complete Your Profile
            </Button>
          )}
        </section>
        <ExchangeRate />
        <ListTransaction />
      </section>
    </BaseContainer>
  )
}

export default HomeScreen

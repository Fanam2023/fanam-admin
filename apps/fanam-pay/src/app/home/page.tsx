"use client"

import {Button, ImageView} from "@fanam-pkg/core-ui-sass"
import assets from "assets"
import {BaseContainer, ExchangeRate, ListTransaction} from "organisms"
import {ROUTE_RECIPIENTS, ROUTE_SENDER} from "utils"
import styles from "./Page.module.sass"
import useHandler from "./handler"

const HomeScreen = () => {
  const {address, push} = useHandler()
  return (
    <BaseContainer childWrapper={styles.page_container} isStepper buttonText="Next" skipBtn="Back">
      <section className={styles.page_wrapper}>
        <h2>Good Afternoon, Jhon</h2>
        <h5>Discover how your currency has been tracking with our exchange rate charts.</h5>
        <section className={`flex ${styles.nav_wrapper}`}>
          <ImageView src={assets.ic_money} alt="money-icon" imgSize={32} />
          <h3>Send your money instantly and effortlessly</h3>
          {address ? (
            <Button wrapperClass={styles.button_wrapper} onClick={() => push(ROUTE_RECIPIENTS)}>
              Send Money
            </Button>
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

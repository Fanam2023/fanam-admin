"use client"

import {Button, ImageView} from "@fanam-pkg/core-ui-sass"
import {useResize} from "@fanam-pkg/core-utils"
import Link from "next/link"
import assets from "assets"
import {BaseContainer, ExchangeRate, ListTransaction} from "organisms"
import {ROUTE_RECIPIENTS, ROUTE_SENDER} from "utils"
import useHandler from "./handler"
import styles from "./page.module.sass"

const HomeScreen = () => {
  const {first_name, push, isKYCVerified} = useHandler()
  const {isDesktop} = useResize()

  return (
    <BaseContainer childWrapper={styles.page_container}>
      <section className={styles.main_container}>
        <section className={`flex ${styles.name_wrapper}`}>
          <h2 className={styles.title}>Good Afternoon,</h2>
          <h2 className={styles.first_name}>{first_name}</h2>
        </section>
        <h5 className={styles.content}>Discover how your currency has been tracking with our exchange rate charts.</h5>
        <section className={`flex-sb-center ${styles.nav_wrapper}`}>
          <section className="flex">
            <ImageView src={assets.ic_money} alt="money-icon" imgSize={isDesktop ? 60 : 36} />
            <h3 className={styles.heading}>Send your money instantly and effortlessly</h3>
          </section>
          {isKYCVerified ? (
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

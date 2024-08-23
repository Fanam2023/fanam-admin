import {Button, ImageView} from "@fanam-pkg/core-ui-sass"
import assets from "assets"
import styles from "./Page.module.sass"
import {Currency_rate} from "./exchange-rate"
import {History} from "./transaction-list"

const HomeScreen = () => {
  return (
    <section className={styles.page_wrapper}>
      <h2>Good Afternoon, Jhon</h2>
      <h5>Discover how your currency has been tracking with our exchange rate charts.</h5>
      <section className={`flex ${styles.nav_wrapper}`}>
        <ImageView src={assets.ic_money} alt={""} imgSize={32} />
        <h3>Send your money instantly and effortlessly</h3>
        <Button wrapperClass={styles.button_wrapper}>Send Money</Button>
      </section>
      <Currency_rate />
      <History />
    </section>
  )
}

export default HomeScreen

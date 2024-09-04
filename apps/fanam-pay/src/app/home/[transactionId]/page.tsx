import {ImageView} from "@fanam-pkg/core-ui-sass"
import assets from "assets"
import styles from "./Page.module.sass"

const TransactionDetails = () => (
  <section className={"card"}>
    <h3 className={styles.txt_wrapper}>Transaction Details</h3>
    <section className={`flex ${styles.payment_wrapper}`}>
      <ImageView src={assets.ic_profile} alt="profile" imgSize={42} />
      <section>
        <h4 className="bold">Jun</h4>
        <h4 className={`bold ${styles.date}`}>19</h4>
      </section>
      <section>
        <section className="flex">
          <h4 className="bold">Phillip Levin</h4>
          <h6 className={styles.transaction_id}>#1190538268</h6>
        </section>
        <section className={`flex ${styles.transaction_wrapper}`}>
          <h5 className={styles.transaction_mode}>Mode: Bank account</h5>
          <ImageView src={assets.ic_dot} alt="dot" imgSize={6} className={styles.dot_wrapper} />
          <h5 className={styles.transaction_time}>Transfer Time : 2-3 days</h5>
        </section>
      </section>
      <section className={styles.amount_wrapper}>
        <h6 className={styles.payment_txt}>Payment Processing </h6>
        <section className={`flex ${styles.amount_container}`}>
          <h4 className={`semi-bold ${styles.amount_inr}`}>10,000 INR</h4>
          <h5 className={`semi-bold ${styles.amount_usd}`}>98 USD</h5>
        </section>
      </section>
    </section>
    <section className={styles.transaction_container}>
      <section className={`flex-col ${styles.payment_container}`}>
        <h4 className={`bold ${styles.txt_wrapper}`}>Details</h4>
        <section className={"flex"}>
          <h5 className={styles.transaction_details}>You were going to send</h5>
          <h5 className={`semi-bold ${styles.payment_amount}`}>1,000 USD</h5>
        </section>
        <section className={"flex"}>
          <h5 className={styles.transaction_details}>Transfer Fee</h5>
          <h5 className={`semi-bold ${styles.payment_amount}`}>200.00 USD</h5>
        </section>
        <section className={"flex"}>
          <h5 className={styles.transaction_details}>Exchange Rate</h5>
          <h5 className={`semi-bold ${styles.payment_amount}`}>1,000 USD</h5>
        </section>
        <section className={`flex ${styles.total_wrapper}`}>
          <h5 className={styles.transaction_txt}>Receiver will get Exactly</h5>
          <h5 className={`semi-bold ${styles.total_usd}`}>92,962.05 USD</h5>
        </section>
        <section className={"flex"}>
          <h5 className={styles.transaction_txt}>Transaction Number</h5>
          <h5 className={`semi-bold ${styles.transaction_number}`}>#1190538268</h5>
        </section>
      </section>
      <section className={`flex-col ${styles.recipient_detail}`}>
        <h4 className={`bold ${styles.txt_wrapper}`}>Recipient Details</h4>
        <section className="flex">
          <h5 className={styles.header}>First Name</h5>
          <h5 className={`semi-bold ${styles.detail}`}>Varshini</h5>
        </section>
        <section className="flex">
          <h5 className={styles.header}>Last Name</h5>
          <h5 className={`semi-bold ${styles.detail}`}>Patel</h5>
        </section>
        <section className="flex">
          <h5 className={styles.header}>Email</h5>
          <h5 className={`semi-bold ${styles.detail}`}>Varshini123@gmail.com</h5>
        </section>
        <section className="flex">
          <h5 className={styles.header}>Phone Number</h5>
          <h5 className={`semi-bold ${styles.detail}`}>6785674356</h5>
        </section>
        <section className="flex">
          <h5 className={styles.header}>Account Type</h5>
          <h5 className={`semi-bold ${styles.detail}`}>Saving</h5>
        </section>
        <section className="flex">
          <h5 className={styles.header}>Account Number</h5>
          <h5 className={`semi-bold ${styles.detail}`}>27379264923864</h5>
        </section>
        <section className="flex">
          <h5 className={styles.header}>Bank Name</h5>
          <h5 className={`semi-bold ${styles.detail}`}>Swis Bnak</h5>
        </section>
        <section className="flex">
          <h5 className={styles.header}>Bank Code Type</h5>
          <h5 className={`semi-bold ${styles.detail}`}>United States</h5>
        </section>
        <section className="flex">
          <h5 className={styles.header}>Bank Code</h5>
          <h5 className={`semi-bold ${styles.detail}`}>12344</h5>
        </section>
        <section className="flex">
          <h5 className={styles.header}>Branch</h5>
          <h5 className={`semi-bold ${styles.detail}`}>california</h5>
        </section>
        <section className="flex">
          <h5 className={styles.header}>BIC</h5>
          <h5 className={`semi-bold ${styles.detail}`}>United States</h5>
        </section>
        <section className="flex">
          <h5 className={styles.header}>Country</h5>
          <h5 className={`semi-bold ${styles.detail}`}>United States</h5>
        </section>
        <section className="flex">
          <h5 className={styles.header}>State</h5>
          <h5 className={`semi-bold ${styles.detail}`}>Alabama</h5>
        </section>
        <section className="flex">
          <h5 className={styles.header}>City/District</h5>
          <h5 className={`semi-bold ${styles.detail}`}>Tuscaloosa</h5>
        </section>
        <section className="flex">
          <h5 className={styles.header}>Pin code</h5>
          <h5 className={`semi-bold ${styles.detail}`}>35401</h5>
        </section>
      </section>
    </section>
  </section>
)

export default TransactionDetails
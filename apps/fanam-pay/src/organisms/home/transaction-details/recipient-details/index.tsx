import styles from "./styles.module.sass"

export const RecipientDetails = () => (
  <section>
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
)

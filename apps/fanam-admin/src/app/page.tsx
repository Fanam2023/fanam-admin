import Login from "./auth/login/page"
import styles from "./page.module.sass"

export default function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.scss file.
   */
  return (
    <div className={styles.page}>
      <Login />
    </div>
  )
}

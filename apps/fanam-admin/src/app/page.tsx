import {redirect} from "next/navigation"
import Login from "./auth/login/page"
import styles from "./page.module.sass"

export default function Index() {
  redirect("/auth/login")

  return (
    <div className={styles.page}>
      <Login />
    </div>
  )
}

"use client"

import {useHandler} from "./handler"
import styles from "./page.module.sass"

const AuthPasskey = () => {
  const {onAuthenticate, onRegister, registrationInfo} = useHandler()

  return (
    <section className={styles.page_container}>
      <h2 className={`bold ${styles.txt_wrapper}`}>Use your fingerprint to login in faster and more securely</h2>
      <h5>
        Your device has a fingerprint reader that works with, giving you a simple password-free way to verify your
        identity
      </h5>
      <button onClick={onRegister} className={styles.button_wrapper}>
        Start Registration
      </button>
      {!!registrationInfo && (
        <button onClick={onAuthenticate} className={styles.authenbtn_wrapper}>
          Start Authentication
        </button>
      )}
    </section>
  )
}

export default AuthPasskey

"use client"

import {Button, Checkbox, ImageView, TextField} from "@fanam-pkg/core-ui-sass"
import {useRouter} from "next/navigation"
import {useState} from "react"
import assets from "assets"
import styles from "./page.module.sass"

const Login = () => {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = () => {
    router.push("/dashboard")
  }

  return (
    <section className={`flex ${styles.container}`}>
      <ImageView src={assets.img_fanam} alt="Fanam Poster" wrapperClass={styles.image_section} />

      <section className={styles.form_container}>
        <section className="flex-col">
          <h2 className={styles.header}>Login to your account!</h2>
          <label className={styles.sub_header}>E-mail </label>
          <TextField
            name="email"
            type="email"
            label="Enter e-mail"
            wrapperClass={styles.input_field}
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <label className={styles.sub_header}>Password </label>
          <TextField
            name="password"
            type="password"
            label="Enter password"
            wrapperClass={styles.input_field}
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <section className="flex">
            <Checkbox item={{label: "Remember me"}} />
            <h6 className={styles.forget_txt}>Forgot password ?</h6>
          </section>
          <Button wrapperClass={styles.login_btn} onClick={handleLogin}>
            Login
          </Button>
        </section>
      </section>
    </section>
  )
}

export default Login

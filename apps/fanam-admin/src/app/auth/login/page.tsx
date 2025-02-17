"use client"

import {Button, Checkbox, ImageView, TextField} from "@fanam-pkg/core-ui-sass"
import assets from "assets"
import {useLoginHandler} from "./handler"
import styles from "./page.module.sass"

const Login = () => {
  const {onLoginSubmit, data, errData, onChangeData} = useLoginHandler()
  const {errEmail, errPassword} = errData
  const {email, password} = data

  return (
    <section className={`flex ${styles.container}`}>
      <ImageView src={assets.img_fanam} alt="Fanam Poster" wrapperClass={styles.image_section} />

      <section className={styles.form_container}>
        <section className="flex-col">
          <h2 className={styles.header}>Login to your account!</h2>
          <form onSubmit={onLoginSubmit}>
            <label className={styles.sub_header}>E-mail </label>
            <TextField
              name="email"
              type="email"
              label="Enter e-mail"
              wrapperClass={styles.input_field}
              value={email}
              error={errEmail}
              onChangeData={onChangeData}
            />
            <label className={styles.sub_header}>Password </label>
            <TextField
              name="password"
              type="password"
              label="Enter password"
              wrapperClass={styles.input_field}
              value={password}
              error={errPassword}
              onChangeData={onChangeData}
            />
            <section className="flex">
              <Checkbox item={{label: "Remember me"}} />
              <h6 className={styles.forget_txt}>Forgot password ?</h6>
            </section>
            <Button wrapperClass={styles.login_btn} type="submit">
              Login
            </Button>
          </form>
        </section>
      </section>
    </section>
  )
}

export default Login

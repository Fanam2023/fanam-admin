"use client"

import {Button} from "@fanam-pkg/core-ui-sass"
import {useRouter} from "next/navigation"
import {useCommon} from "hooks"
import useHandler from "./handler"
import styles from "./page.module.sass"

const Hdfc = () => {
  const {push} = useRouter()
  const {createParams} = useCommon()
  const {refetchClient} = useHandler()

  // const onClickDashBoard = () => {
  //   const data = createParams("Hdfc_bank")
  //   push(`/?${data}`)
  // }

  const onClickPayment = async () => {
    // Fetch client details
    await refetchClient()
  }

  return (
    <section className={styles.demo_page}>
      <section className={`flex-col-center `}>
        <Button wrapperClass={styles.btn_wrapper} onClick={onClickPayment}>
          click Payment
        </Button>
      </section>
    </section>
  )
}

export default Hdfc

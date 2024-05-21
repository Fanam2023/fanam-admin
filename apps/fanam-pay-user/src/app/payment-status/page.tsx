"use client"

import {ImageView} from "@fanam-pkg/core-ui-sass"
import {useSearchParams} from "next/navigation"
import {Fragment} from "react"
import assets from "assets"
import {PaymentDetailsProps} from "props"
import styles from "./page.module.sass"

type StatusType = "pending" | "success" | "failure"

const getStatusIcon = (status: StatusType) => {
  switch (status) {
    case "pending":
      return assets.ic_pending_large
    case "success":
      return assets.ic_success_large
    case "failure":
      return assets.ic_unsuccess_large
    default:
      return assets.ic_pending_large
  }
}

const getSmallStatusIcon = (status: StatusType) => {
  switch (status) {
    case "pending":
      return assets.ic_pending_small
    case "success":
      return assets.ic_success_small
    case "failure":
      return assets.ic_unsuccess_small
    default:
      return assets.ic_pending_small
  }
}

const PaymentStatus = () => {
  const searchParams = useSearchParams()

  const status = searchParams.get("status") as StatusType

  const PAYMENT_DETAILS: PaymentDetailsProps[] = [
    {
      label: "Ref Number",
      value: "756551544215",
    },
    {
      label: "Payment Status",
      value: status === "failure" ? "Unsuccessful!" : status === "success" ? "Success" : "Processing",
      icon: getSmallStatusIcon(status),
    },
    {
      label: "Payment Time",
      value: "3-5 Business Days",
    },
  ]

  const renderPaymentDetails = ({label, icon, value}: PaymentDetailsProps, index: number) => (
    <section className={`flex-sb-center ${styles.content}`} key={index}>
      <h5>{label}</h5>
      <section className={`flex ${styles.img_section}`}>
        {icon ? (
          <Fragment>
            <ImageView src={icon} alt="" imgSize={20} />
            <h5>{value}</h5>
          </Fragment>
        ) : (
          <h5>{value}</h5>
        )}
      </section>
    </section>
  )

  return (
    <Fragment>
      <section className={`flex-col-center ${styles.payment_status_wrapper}`}>
        <ImageView src={getStatusIcon(status)} alt={"status-icon"} imgSize={56} />
        <h4 className={styles.payment_text}>
          {status === "success"
            ? "Payment Success!"
            : status === "failure"
              ? "Payment Unsuccessful!"
              : "Payment Processing!"}
        </h4>
        <h2 className={styles.currency_text}>{"$ 707"}</h2>
      </section>
      <section className={`flex-col ${styles.payment_details_wrapper}`}>
        <h4>Payment Details</h4>
        <ul>{PAYMENT_DETAILS.map(renderPaymentDetails)}</ul>
        <section className={`flex-sb-center ${styles.total}`}>
          <h5>Total Payment</h5>
          <h5>{"$ 707"}</h5>
        </section>
      </section>
      <section className={`flex-sb-center ${styles.payment_helper_wrapper}`}>
        <ImageView src={assets.ic_help} alt={"help-icon"} imgSize={48} />
        <section className={`flex-col ${styles.helper_wrapper}`}>
          <h4 className={styles.trouble_text}>Trouble With Your Payment?</h4>
          <h5>Let us know on help center now!</h5>
        </section>
        <ImageView src={assets.ic_blue_right_arrow} alt={"right-arrow"} imgSize={20} />
      </section>
    </Fragment>
  )
}

export default PaymentStatus

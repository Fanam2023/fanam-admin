"use client"

import {ImageView} from "@fanam-pkg/core-ui-sass"
import {useSearchParams} from "next/navigation"
import assets from "assets"
import {BaseContainer} from "organisms"
import {PaymentDetailsProps, StatusType} from "props"
import styles from "./page.module.sass"

const getStatusData = (status: StatusType) => {
  switch (status) {
    case "success":
      return {
        bigIcon: assets.ic_success,
        smallIcon: assets.ic_success_small,
        title: "Payment Success!",
        statusText: "Success",
      }
    case "failure":
      return {
        bigIcon: assets.ic_failure,
        smallIcon: assets.ic_failure_small,
        title: "Payment Unsuccessful!",
        statusText: "Unsuccessful",
      }
    case "pending":
      return {
        bigIcon: assets.ic_pending,
        smallIcon: assets.ic_pending_small,
        title: "Payment Processing!",
        statusText: "Processing",
      }

    default:
      return {
        bigIcon: assets.ic_pending,
        smallIcon: assets.ic_pending_small,
        title: "Payment Processing!",
        statusText: "processing",
      }
  }
}

const PaymentStatus = () => {
  const searchParams = useSearchParams()

  const status = searchParams.get("status") as StatusType

  const {bigIcon, smallIcon, title, statusText} = getStatusData(status)

  const PAYMENT_DETAILS: PaymentDetailsProps[] = [
    {
      label: "Ref Number",
      value: "756551544215",
    },
    {
      label: "Payment Status",
      value: statusText,
      icon: smallIcon,
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
        {!!icon && <ImageView src={icon} alt="status-icon" imgSize={20}></ImageView>}
        <h5>{value}</h5>
      </section>
    </section>
  )

  const DownloadReceipt = () => <h6 className={styles.receipt_text}>Download Receipt</h6>

  return (
    <BaseContainer
      buttonText="Done"
      header="Payment Status"
      footerChild={DownloadReceipt()}
      childWrapper={styles.page_container}
      skipBtn="Download Receipt"
      stepIndex={"pending"}>
      <section className={`flex-col-center ${styles.page_wrapper}`}>
        <section className={`flex-col-center ${styles.payment_status_wrapper}`}>
          <ImageView src={bigIcon} alt={"status-icon"} imgSize={56} />
          <h4 className={styles.payment_text}>{title}</h4>
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
            <h4>Trouble With Your Payment?</h4>
            <h5>Let us know on help center now!</h5>
          </section>
          <ImageView src={assets.ic_arrow_theme} alt={"right-arrow"} imgSize={20} />
        </section>
      </section>
    </BaseContainer>
  )
}

export default PaymentStatus

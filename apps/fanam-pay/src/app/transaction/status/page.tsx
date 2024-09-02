"use client"

import {ImageView} from "@fanam-pkg/core-ui-sass"
import {useSearchParams} from "next/navigation"
import assets from "assets"
import {BaseContainer} from "organisms"
import {PaymentDetailsProps, StatusType} from "props"
import {useHandler} from "./handler"
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

const TransactionStatusPage = () => {
  const searchParams = useSearchParams()
  const {onBack} = useHandler()

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
    },
    {
      label: "Payment Time",
      value: "3-5 Business Days",
    },
  ]

  const renderPaymentDetails = ({label, value}: PaymentDetailsProps, index: number) => (
    <section className={`flex-sb-center ${styles.content}`} key={index}>
      <h5>{label}</h5>
      <section className={`flex ${styles.img_section}`}>
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
      stepIndex="pending"
      onBack={onBack}>
      <section className={`flex-col ${styles.heading_wrapper}`}>
        <h4 className="bold">Payment Status</h4>
        <h5>Get the payment status after sending the money.</h5>
      </section>
      <section className={`flex-col-center ${styles.payment_status_wrapper}`}>
        <ImageView src={bigIcon} alt={"status-icon"} imgSize={56} />
        <h4 className={`bold ${styles.payment_text}`}>{title}</h4>
        <h4 className={`bold  ${styles.currency_text}`}>{"$ 707"}</h4>
      </section>
      <section className={styles.source_payment_wrapper}>
        <h4 className={styles.source_payment}>Source of Payment</h4>
        <section className={`flex ${styles.account_wrapper}`}>
          <ImageView src={assets.ic_account} alt="bank-image" imgSize={20} />
          <h5>Bank Account</h5>
        </section>
        <hr className={styles.separator} />
        <section>
          <h4 className={styles.source_payment}>Payment Details</h4>
          <ul>{PAYMENT_DETAILS.map(renderPaymentDetails)}</ul>
          <hr className={styles.separator} />
          <section className={`flex-sb-center ${styles.total}`}>
            <h5>Total Payment</h5>
            <h5 className={styles.source_payment}>{"$ 707"}</h5>
          </section>
        </section>
      </section>
      <section className={`flex-sb-center ${styles.payment_helper_wrapper}`}>
        <section className={`flex ${styles.payment_helper_container}`}>
          <ImageView src={assets.ic_help_theme} alt={"help-icon"} imgSize={32} />
          <section className={`flex-col ${styles.helper_wrapper}`}>
            <h5 className="bold">Trouble With Your Payment?</h5>
            <h6>Let us know on help center now!</h6>
          </section>
        </section>
        <ImageView src={assets.ic_arrow_theme} alt={"right-arrow"} imgSize={20} />
      </section>
    </BaseContainer>
  )
}

export default TransactionStatusPage

"use client"

import {Button, ImageView} from "@fanam-pkg/core-ui-sass"
import {TypeTransactionStatus} from "@custom/utils"
import assets from "assets"
import {BaseContainer} from "organisms"
import {PaymentDetailsProps} from "props"
import {useHandler} from "./handler"
import styles from "./page.module.sass"

const getStatusData = (status: TypeTransactionStatus) => {
  switch (status) {
    case "Payment_successful":
      return {
        bigIcon: assets.ic_success,
        smallIcon: assets.ic_success_small,
        title: "Payment Success!",
        statusText: "Success",
      }
    case "Payment_failed":
      return {
        bigIcon: assets.ic_failure,
        smallIcon: assets.ic_failure_small,
        title: "Payment Unsuccessful!",
        statusText: "Unsuccessful",
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
  const {transactionDetail, routeHome} = useHandler()

  const {status, transfer_time, final_amount, destination_amount, destination_country, source_country, order} =
    transactionDetail || {}

  const {bigIcon, smallIcon, title, statusText} = getStatusData(status)

  const {order_no} = order || {}

  const {sla_timing_min, sla_timing_max} = transfer_time || {}

  const PAYMENT_DETAILS: PaymentDetailsProps[] = [
    {
      label: "Ref Number",
      value: order_no,
    },
    {
      label: "Payment Status",
      value: statusText,
    },
    {
      label: "Payment Time",
      value:
        sla_timing_min !== sla_timing_max ? `${sla_timing_min} - ${sla_timing_max} hours` : `${sla_timing_min} hours`,
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

  const DownloadReceipt = () => (
    <Button buttonType="primary-outlined" wrapperClass={styles.receipt_button}>
      Download Receipt
    </Button>
  )

  return (
    <BaseContainer
      buttonText="Done"
      header="Payment Status"
      footerChild={<DownloadReceipt />}
      childWrapper={styles.page_container}
      stepIndex="pending"
      onSubmit={routeHome}
      isStepper>
      <section className={styles.mobile_wrapper}>
        <section className={`flex-col ${styles.heading_wrapper}`}>
          <h4 className="bold">Payment Status</h4>
          <h5>Get the payment status after sending the money.</h5>
        </section>
        <section className={`flex-col-center ${styles.payment_status_wrapper}`}>
          <ImageView src={bigIcon} alt={"status-icon"} imgSize={56} />
          <h4 className={`bold ${styles.payment_text}`}>{title}</h4>
          <h4 className={`bold  ${styles.currency_text}`}>
            {destination_country?.currency_symbol} {destination_amount}
          </h4>
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
              <h5 className={styles.source_payment}>
                {source_country?.currency_symbol}
                {final_amount}
              </h5>
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
      </section>
    </BaseContainer>
  )
}

export default TransactionStatusPage

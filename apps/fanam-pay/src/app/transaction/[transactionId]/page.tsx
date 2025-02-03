"use client"

import {Button, ImageView} from "@fanam-pkg/core-ui-sass"
import {useTranslation} from "react-i18next"
import {TypeOrderStatus} from "@custom/utils"
import assets from "assets"
import {BrowserBackNavigation} from "atoms"
import {BaseContainer} from "organisms"
import {PaymentDetailsProps} from "props"
import {useHandler} from "./handler"
import styles from "./page.module.sass"

const getStatusData = (status: TypeOrderStatus) => {
  const {t} = useTranslation()
  switch (status) {
    case "Transaction_success":
      return {
        bigIcon: assets.ic_success,
        smallIcon: assets.ic_success_small,
        title: t("Payment Success!"),
        statusText: "Success",
      }

    case "Transaction_canceled":
    case "Transaction_failed":
      return {
        bigIcon: assets.ic_failure,
        smallIcon: assets.ic_failure_small,
        title: t("Payment Unsuccessful!"),
        statusText: "Unsuccessful",
      }

    default:
      return {
        bigIcon: assets.ic_pending,
        smallIcon: assets.ic_pending_small,
        title: t("Payment Processing!"),
        statusText: "processing",
      }
  }
}

const TransactionStatusPage = () => {
  const {transactionDetail, routeHome, t} = useHandler()

  const {
    transfer_time,
    final_amount,
    destination_amount,
    destination_country,
    source_country,
    order,
    reconciliation_report,
  } = transactionDetail || {}

  const {order_no, order_status, payment} = order || {}

  const {paymentMethod} = payment || {}

  const {url, file_name} = reconciliation_report || {}

  const {bigIcon, smallIcon, title, statusText} = getStatusData(order_status)

  const {sla_timing_min, sla_timing_max} = transfer_time || {}

  const PAYMENT_DETAILS: PaymentDetailsProps[] = [
    {
      label: t("Ref Number"),
      value: order_no,
    },
    {
      label: t("Payment Status"),
      value: statusText,
    },
    {
      label: t("Payment Time"),
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
    <a href={url} download={file_name} target="_blank" rel="noopener noreferrer">
      <Button buttonType="primary-outlined" wrapperClass={styles.receipt_button}>
        Download Receipt
      </Button>
    </a>
  )

  return (
    <BaseContainer
      buttonText="Done"
      header="Payment Status"
      footerChild={order_status === "Transaction_success" && <DownloadReceipt />}
      childWrapper={styles.page_container}
      stepIndex={5}
      onSubmit={routeHome}
      isStepper>
      <BrowserBackNavigation />
      <section className={styles.mobile_wrapper}>
        <section className={`flex-col ${styles.heading_wrapper}`}>
          <h4 className={`bold ${styles.title}`}>{t("Payment Status")}</h4>
          <h5 className={styles.description}>{t("Get the payment status after sending the money.")}.</h5>
        </section>
        <section className={`flex-col-center ${styles.payment_status_wrapper}`}>
          <ImageView src={bigIcon} alt={"status-icon"} imgSize={56} />
          <h4 className={`bold ${styles.payment_text}`}>{title}</h4>
          <h4 className={`bold  ${styles.currency_text}`}>
            {destination_country?.currency_symbol} {destination_amount?.toFixed(2)}
          </h4>
        </section>
        <section className={styles.source_payment_wrapper}>
          <h4 className={styles.source_payment}>{t("Source of Payment")}</h4>
          <section className={`flex ${styles.account_wrapper}`}>
            <ImageView src={assets.ic_account} alt="bank-image" imgSize={20} />
            <h5 className={styles.payment_method}>{paymentMethod}</h5>
          </section>
          <hr className={styles.separator} />
          <section>
            <h4 className={styles.source_payment}>{t("Payment Details")}</h4>
            <ul>{PAYMENT_DETAILS.map(renderPaymentDetails)}</ul>
            <hr className={styles.separator} />
            <section className={`flex-sb-center ${styles.total}`}>
              <h5>{t("Total Payment")}</h5>
              <h5 className={styles.source_payment}>
                {source_country?.currency_symbol}
                {final_amount?.toFixed(2)}
              </h5>
            </section>
          </section>
        </section>
        <section className={`flex-sb-center ${styles.payment_helper_wrapper}`}>
          <section className={`flex ${styles.payment_helper_container}`}>
            <ImageView src={assets.ic_help_theme} alt={"help-icon"} imgSize={32} />
            <section className={`flex-col ${styles.helper_wrapper}`}>
              <h5 className="bold">{t("Trouble With Your Payment?")}</h5>
              <h6>{t("Let us know on help center now!")}</h6>
            </section>
          </section>
          <ImageView src={assets.ic_arrow_theme} alt={"right-arrow"} imgSize={20} />
        </section>
      </section>
    </BaseContainer>
  )
}

export default TransactionStatusPage

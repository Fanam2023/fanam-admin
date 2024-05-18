"use client"

import {ImageView} from "@fanam-pkg/core-ui-sass"
import {Fragment} from "react"
import assets from "assets"
import {Accordian, Header} from "organisms"
import {BankCartProps, BankListProps} from "props"
import styles from "./page.module.sass"

const LIST_OF_BANK: BankListProps[] = [
  {
    icon: assets.img_bank,
    bankName: "Axis Bank",
    accountType: "Savings Account",
  },
  {
    icon: assets.img_bank,
    bankName: "Indian Bank",
    accountType: "Savings Account",
  },
  {
    icon: assets.img_bank,
    bankName: "SBI",
    accountType: "Current Account",
  },
]

const LIST_OF_CART: BankCartProps[] = [
  {
    icon: assets.img_bank,
    bankName: "Axis Bank",
    cartType: "Debit Card",
  },
  {
    icon: assets.img_bank,
    bankName: "Indian Bank",
    cartType: "Debit Card",
  },
  {
    icon: assets.img_bank,
    bankName: "SBI",
    cartType: "Credit Card",
  },
]

const PAYMENT_DATA = [
  {label: "Payment Duration", value: "5-6 Business Days"},
  {label: "Beneficiary Name", value: "Sheela"},
  {label: "Mode of Payment", value: "Debit Card"},
  {label: "Total", value: "$4545"},
]

const renderPayment = ({label, value}: {label: string; value: string}) => {
  return (
    <section className={`flex-sb-center ${styles.content}`}>
      <h4 className={styles.label_text}>{label}</h4>
      <h4>{value}</h4>
    </section>
  )
}

const renderAccount = ({icon, bankName, accountType}: BankListProps, index: number) => {
  return (
    <section className={`flex ${styles.bank_wrapper}`} key={index}>
      <ImageView src={icon} alt={"bank-icon"} imgSize={40}></ImageView>
      <section className={`flex-col ${styles.desc_wrapper}`}>
        <h4>{bankName}</h4>
        <h5>{accountType}</h5>
      </section>
    </section>
  )
}
const renderCart = ({icon, bankName, cartType}: BankCartProps, index: number) => {
  return (
    <section className={`flex ${styles.bank_wrapper}`} key={index}>
      <ImageView src={icon} alt={"bank-icon"} imgSize={40}></ImageView>
      <section className={`flex-col ${styles.desc_wrapper}`}>
        <h4>{bankName}</h4>
        <h5>{cartType}</h5>
      </section>
    </section>
  )
}

const PaymentOptions = () => {
  return (
    <Fragment>
      <Header title={"Payment options"}></Header>
      <Accordian
        title={"Bank Account"}
        leading_icon={assets.ic_account}
        tailing_icon={assets.ic_black_arrow}
        description={"Pay Money using Bank Account"}
        isFrequent={true}>
        <ul>{LIST_OF_BANK.map(renderAccount)}</ul>
      </Accordian>
      <Accordian
        title={"Debit/Credit Card"}
        description="Pay Money using Credit/ Debit Card"
        leading_icon={assets.ic_debit_card}
        tailing_icon={true}>
        <ul>{LIST_OF_CART.map(renderCart)}</ul>
      </Accordian>
      <Accordian title={"Borrow Money"} leading_icon={assets.ic_lend_money} tailing_icon={false} />
      <section className={styles.payment_container}>
        <hr></hr>
        <section className={`flex-center ${styles.payment_wrapper}`}>
          <h4 className={styles.payment_text}>Payment Summary</h4>
        </section>
        <ul className={`flex-col ${styles.content_wrapper}`}>{PAYMENT_DATA.map(renderPayment)}</ul>
      </section>
    </Fragment>
  )
}

export default PaymentOptions

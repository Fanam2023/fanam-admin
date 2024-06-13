"use client"

import {ImageView} from "@fanam-pkg/core-ui-sass"
import assets from "assets"
import {Accordian, BaseContainer} from "organisms"
import {FooterPayment} from "organisms/base-container/footer-payment"
import {BankCartProps, BankListProps, PaymentDataProps} from "props"
import {usePayment} from "./handler"
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

const PAYMENT_DATA: PaymentDataProps[] = [
  {label: "Payment Duration", value: "5-6 Business Days"},
  {label: "Beneficiary Name", value: "Sheela"},
  {label: "Mode of Payment", value: "Debit Card"},
  {label: "Total", value: "$4545"},
]

const renderPayment = ({label, value}: PaymentDataProps, index: number) => (
  <section className={`flex-sb-center ${styles.content}`} key={index}>
    <h4 className={styles.label_text}>{label}</h4>
    <h4>{value}</h4>
  </section>
)

const renderAccount = ({icon, bankName, accountType}: BankListProps, index: number) => (
  <section className={`flex ${styles.bank_wrapper}`} key={index}>
    <ImageView src={icon} alt={"bank-icon"} imgSize={40}></ImageView>
    <section className={`flex-col ${styles.desc_wrapper}`}>
      <h4>{bankName}</h4>
      <h5>{accountType}</h5>
    </section>
  </section>
)

const renderCart = ({icon, bankName, cartType}: BankCartProps, index: number) => (
  <section className={`flex ${styles.bank_wrapper}`} key={index}>
    <ImageView src={icon} alt={"bank-icon"} imgSize={40}></ImageView>
    <section className={`flex-col ${styles.desc_wrapper}`}>
      <h4>{bankName}</h4>
      <h5>{cartType}</h5>
    </section>
  </section>
)

const PaymentOptions = () => {
  const {onSuccess} = usePayment()

  return (
    <BaseContainer
      header="Payment options"
      childWrapper={styles.page_container}
      footerChild={
        <FooterPayment senderAmount="Rs. 5388.00" reciverName="Varshini receives" recivableAmt="$707.00" button="Pay" />
      }
      backIcon
      onClick={onSuccess}>
      <Accordian
        title={"Bank Account"}
        leadingIcon={assets.ic_account}
        tailingIcon={assets.ic_black_arrow}
        description={"Pay Money using Bank Account"}
        isFrequent={true}>
        <ul>{LIST_OF_BANK.map(renderAccount)}</ul>
      </Accordian>
      <Accordian
        title={"Debit/Credit Card"}
        description="Pay Money using Credit/ Debit Card"
        leadingIcon={assets.ic_debit_card}
        tailingIcon={true}>
        <ul>{LIST_OF_CART.map(renderCart)}</ul>
      </Accordian>
      <Accordian title={"Borrow Money"} leadingIcon={assets.ic_lend_money} tailingIcon={false} />
    </BaseContainer>
  )
}

export default PaymentOptions

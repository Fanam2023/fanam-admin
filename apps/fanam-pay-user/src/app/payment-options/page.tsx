"use client"

import {ImageView} from "@fanam-pkg/core-ui-sass"
import assets from "assets"
import {Accordian, BaseContainer} from "organisms"
import {FooterPayment} from "organisms/base-container/footer-payment"
import {BankCartProps, BankListProps} from "props"
import {LIST_OF_BANK, LIST_OF_CART} from "utils"
import {useHandler} from "./handler"
import styles from "./page.module.sass"

const renderAccount = ({icon, bankName, accountType}: BankListProps, index: number) => (
  <section className={`flex ${styles.bank_wrapper}`} key={index}>
    <ImageView src={icon} alt={"bank-icon"} imgSize={40}></ImageView>
    <section className={`flex-col ${styles.desc_wrapper}`}>
      <h4 className="semi-bold">{bankName}</h4>
      <h6 className="semi-bold">{accountType}</h6>
    </section>
  </section>
)

const renderCart = ({icon, bankName, cartType}: BankCartProps, index: number) => (
  <section className={`flex ${styles.bank_wrapper}`} key={index}>
    <ImageView src={icon} alt={"bank-icon"} imgSize={40}></ImageView>
    <section className={`flex-col ${styles.desc_wrapper}`}>
      <h4 className="semi-bold">{bankName}</h4>
      <h6 className="semi-bold">{cartType}</h6>
    </section>
  </section>
)

const PaymentOptions = () => {
  const {onSuccess} = useHandler()

  return (
    <BaseContainer
      header="Payment options"
      childWrapper={styles.page_container}
      footerChild={
        <FooterPayment senderAmount="Rs. 5388.00" reciverName="Varshini receives" recivableAmt="$707.00" button="Pay" />
      }
      onClick={onSuccess}
      stepIndex={5}>
      <section className={styles.page_wrapper}>
        <section className={styles.card}>
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
        </section>
      </section>
    </BaseContainer>
  )
}

export default PaymentOptions

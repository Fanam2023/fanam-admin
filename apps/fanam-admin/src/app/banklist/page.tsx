"use client"

import {Table} from "@fanam-pkg/core-ui-sass"
import {useHandler} from "./handler"
import styles from "./page.module.sass"

const BankList = () => {
  const {bankData, TABLE_HEADER} = useHandler()

  return (
    <>
      <Table tableItems={bankData} tableHeaders={TABLE_HEADER} wrapperClass={styles.table_header} />
    </>
  )
}
export default BankList

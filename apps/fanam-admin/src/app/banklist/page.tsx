"use client"

import {Button, Table} from "@fanam-pkg/core-ui-sass"
import {useHandler} from "./handler"
import styles from "./page.module.sass"

const BankList = () => {
  const {bankData, TABLE_HEADER, onAdd} = useHandler()

  return (
    <>
      <Button wrapperClass={`flex ${styles.create_btn}`} onClick={onAdd}>
        + Create
      </Button>
      <Table tableItems={bankData} tableHeaders={TABLE_HEADER} wrapperClass={styles.table_header} />
    </>
  )
}
export default BankList

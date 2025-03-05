"use client"

import {Button, Table} from "@fanam-pkg/core-ui-sass"
import {useHandler} from "./handler"
import styles from "./page.module.sass"

const BankList = () => {
  const {bankData, TABLE_HEADER, onAdd} = useHandler()

  return (
    <section className={styles.container}>
      <section className="d-flex gap-3">
        <Button wrapperClass={`d-flex ${styles.create_btn}`} onClick={onAdd}>
          + Create
        </Button>
      </section>
      <Table tableItems={bankData} tableHeaders={TABLE_HEADER} wrapperClass={styles.table_header} />
    </section>
  )
}

export default BankList

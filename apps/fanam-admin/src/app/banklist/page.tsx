"use client"

import {Button, Table} from "@fanam-pkg/core-ui-sass"
import {useHandler} from "./handler"
import styles from "./page.module.sass"

const BankList = () => {
  const {bankData, TABLE_HEADER, onAdd, isDeleteModalOpen, handleDeleteClick, handleDiscard, handleDeleteConfirm} =
    useHandler()

  return (
    <section className={styles.container}>
      <section className="d-flex gap-3">
        <Button wrapperClass={`d-flex ${styles.create_btn}`} onClick={onAdd}>
          + Create
        </Button>
      </section>

      <Table tableItems={bankData} tableHeaders={TABLE_HEADER} wrapperClass={styles.table_header} />

      {isDeleteModalOpen && (
        <section className={styles.modal} tabIndex={-1}>
          <section className={styles.modal_dialog}>
            <section className={styles.modal_content}>
              {/* <section className={styles.modal_header}>
                <h5 className={styles.modal_title}>Confirm Deletion</h5>
                <button className={styles.close_btn} onClick={handleDiscard}>
                  &times;
                </button>
              </section> */}
              <section className={styles.modal_body}>
                <p>Are you sure you want to delete this item?</p>
              </section>
              <section className={styles.modal_footer}>
                <Button wrapperClass={styles.discard_btn} onClick={handleDiscard}>
                  Discard
                </Button>
                <Button wrapperClass={styles.confirm_btn} onClick={handleDeleteConfirm}>
                  Delete
                </Button>
              </section>
            </section>
          </section>
        </section>
      )}
    </section>
  )
}

export default BankList

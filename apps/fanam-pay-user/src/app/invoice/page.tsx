"use client"

import {GroupAttachment} from "@fanam-pkg/core-ui-sass"
import {BaseContainer} from "organisms"
import {useHandler} from "./handler"
import styles from "./style.module.sass"

const AddAttachment = () => {
  const {data, onChangeValue, errData, onUpload} = useHandler()

  const {invoice} = data
  const {errInvoice} = errData

  return (
    <BaseContainer
      header="Upload Documents"
      buttonText="Continue"
      onSubmit={onUpload}
      childWrapper={styles.page_container}
      stepIndex={2}>
      <section className={styles.title_wrapper}>
        <h4>Upload Supporting Documents(optional)</h4>
        <h5 className={styles.type_wrapper}>JPG, PNG and PDF Files Up to 1MB</h5>
      </section>
      <GroupAttachment
        isMultiple={true}
        name="invoice"
        error={errInvoice}
        value={invoice}
        onChangeData={onChangeValue}
        wrapperClass={styles.attachment_wrapper}
      />
    </BaseContainer>
  )
}

export default AddAttachment

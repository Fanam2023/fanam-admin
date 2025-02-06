"use client"

import {DropDown, GroupAttachment, TextArea} from "@fanam-pkg/core-ui-sass"
import {BaseContainer} from "organisms"
import useHandler from "./handler"
import styles from "./page.module.sass"

const TransactionPurpose = () => {
  const {onChangeValue, PURPOSES, onSubmit, data, errState, t} = useHandler()
  const {purpose, reason, doc} = data
  const {errDoc, errPurpose, errReason} = errState

  return (
    <BaseContainer
      stepIndex={2}
      buttonText={t("Next")}
      skipBtn={t("Back")}
      isStepper
      childWrapper={`flex-col-center ${styles.page_wrapper}`}
      onSubmit={onSubmit}>
      <section className={`flex-col ${styles.heading_wrapper}`}>
        <h4 className={`bold ${styles.title}`}>{t("Purpose of Sending Money")}</h4>
        <h5 className={styles.description}>
          {t(
            "Estimated value for converting your money from one currency to another based on the current exchange rates."
          )}
        </h5>
      </section>
      <section className={styles.card_wrapper}>
        <h5 className={`bold ${styles.description}`}>{t("Purpose of Sending Money")}</h5>
        <DropDown
          options={PURPOSES}
          wrapperClass={styles.drop_down_wrapper}
          label={t("Purpose of Sending Money")}
          selected={purpose}
          name="purpose"
          onChangeData={onChangeValue}
          error={errPurpose}
        />
        <section className={styles.text_area_wrapper}>
          <TextArea
            maxLength={50}
            wrapperClass={styles.text_area}
            label={t("Please provide a brief note on your purpose of sending money")}
            name="reason"
            value={reason}
            onChangeData={onChangeValue}
            error={errReason}
          />
        </section>
        <section className={styles.upload_wrapper}>
          <h5 className={`bold ${styles.title}`}>{t("Upload Supporting Document")}</h5>
          <p className={styles.child_text}>
            {t("upload the supporting doument related to the purpose of sending money")}
          </p>
          <GroupAttachment
            wrapperClass={styles.file_upload}
            name="doc"
            onChangeData={onChangeValue}
            isRequired={false}
            error={errDoc}
            isMultiple={true}
            maxCount={2}
            fileType={["image/*", "application/pdf"]}
            value={doc}
          />
        </section>
      </section>
    </BaseContainer>
  )
}

export default TransactionPurpose

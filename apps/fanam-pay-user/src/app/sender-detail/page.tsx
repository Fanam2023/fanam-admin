"use client"

import {DropDown, GroupForm, ImageView, RadioButton} from "@fanam-pkg/core-ui-sass"
import assets from "assets"
import {BaseContainer} from "organisms"
import useHandler from "./handler"
import styles from "./sender.module.sass"

const senderDetail = () => {
  const {
    formElements,
    onChangeValue,
    onSubmit,
    senderType,
    onSelectSenderType,
    handleDropDown,
    dropDownLabel,
    uploadSections,
  } = useHandler(
    message => console.log(message),
    message => console.log(message)
  )

  const onAddAttachment = ({file, label, onBrowse, onAttachment, onRemove, fileInputRef}, index) => (
    <section key={index}>
      {!file && (
        <section className={`flex ${styles.upload_container}`} onClick={onBrowse}>
          <ImageView src={assets.ic_cloudUpload} alt={"upload"} imgSize={24} />
          <h5 className={styles.text_wrapper}>{label}</h5>
          <input
            type="file"
            ref={fileInputRef}
            onChange={e => onAttachment(e)}
            className={styles.input_wrapper}
            style={{display: "none"}}
          />
        </section>
      )}
      {file && (
        <ul>
          <li className={`flex-sb-center ${styles.file_wrapper}`}>
            <section className="flex">
              <ImageView src={assets.ic_file} alt="File_icon" imgSize={32} />
              <section className={styles.name_wrapper}>
                <h4>{file.name}</h4>
                <h6>{file.size}</h6>
              </section>
            </section>
            <ImageView src={assets.ic_remove} alt="Remove_icon" imgSize={16} onClick={onRemove} />
          </li>
        </ul>
      )}
    </section>
  )

  return (
    <BaseContainer
      header="Cross Border Remittance"
      childWrapper={styles.page_container}
      backIcon={false}
      buttonText="continue"
      onSubmit={onSubmit}>
      <section className={styles.container_wrapper}>
        <section className={`flex-col ${styles.button_container}`}>
          <h2>Add Sender Details</h2>
          <h4 className="semi-bold">Sender type</h4>
          <RadioButton
            items={senderType}
            onSelectItems={onSelectSenderType}
            wrapperClass={styles.radio_button}
            radioGroupName="senderTypeGroup"
          />
        </section>
        <GroupForm formSections={formElements} />
        <h4 className="semi-bold">ID Type</h4>
        <DropDown
          options={["PassPort", "Driving License"]}
          wrapperClass={styles.drop_down_wrapper}
          label={dropDownLabel}
          onChangeData={handleDropDown}
        />
        {uploadSections.map((section, index) => onAddAttachment(section, index))}
      </section>
    </BaseContainer>
  )
}

export default senderDetail

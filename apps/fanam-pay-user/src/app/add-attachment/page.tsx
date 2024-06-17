"use client"

import {Button, ImageView} from "@fanam-pkg/core-ui-sass"
import assets from "assets"
import {BaseContainer} from "organisms"
import {AddAttachmentProps} from "props"
import {useAddAttachmentHandler} from "./handler"
import styles from "./style.module.sass"

const AddAttachment = () => {
  const {selFiles, fileInputRef, onRemove, onBrowse, onAttachment, onUpload} = useAddAttachmentHandler()

  const renderAddAttachments = ({name, size}: AddAttachmentProps, index: number) => (
    <li className={`flex-sb-center ${styles.file_wrapper}`} key={index}>
      <section className="flex">
        <ImageView src={assets.ic_file} alt="File_icon" imgSize={32} />
        <section className={styles.name_wrapper}>
          <h4>{name}</h4>
          <h6>{size}</h6>
        </section>
      </section>
      <ImageView src={assets.ic_remove} alt="Remove_icon" imgSize={16} onClick={onRemove.bind(null, index)} />
    </li>
  )

  return (
    <BaseContainer
      header="Upload Documents"
      buttonText="Continue"
      onClick={onUpload}
      childWrapper={styles.page_container}>
      <section className={styles.title_wrapper}>
        <h4>Upload Supporting Documents(optional)</h4>
        <h5 className={styles.type_wrapper}>JPG, PNG and PDF Files Up to 1MB</h5>
      </section>
      <section className={`flex-col-center ${styles.card_wrapper}`}>
        <ImageView src={assets.ic_upload} alt={"Upload_icon"} imgSize={45} />
        <h4>Browse file from your device</h4>
        <Button onClick={onBrowse} className={styles.button_wrapper}>
          Browse
        </Button>
        <input type="file" ref={fileInputRef} onChange={onAttachment} className={styles.input_wrapper} />
      </section>
      <ul>{selFiles.map(renderAddAttachments)}</ul>
    </BaseContainer>
  )
}

export default AddAttachment

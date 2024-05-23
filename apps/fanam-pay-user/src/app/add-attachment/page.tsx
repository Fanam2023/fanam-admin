"use client"

import {Button, ImageView} from "@fanam-pkg/core-ui-sass"
import assets from "assets"
import {BaseContainer} from "organisms"
import {useAddAttachment} from "./handler"
import styles from "./style.module.sass"

const AddAttachment = () => {
  const {fileUploaded, uploadedFiles, fileInputRef, handleRemoveClick, onBrowseClick, onFileChange} = useAddAttachment()

  const renderAddAttachments = ({name, size}, index: number) => {
    return (
      <section key={index}>
        {fileUploaded && (
          <ul className={`flex-sb-center ${styles.file_wrapper}`}>
            <section className="flex">
              <ImageView src={assets.ic_file} alt="File_icon" imgSize={32} />
              <section>
                <h5>{name}</h5>
                <h6>{size}</h6>
              </section>
            </section>
            <ImageView src={assets.ic_remove} alt="Remove_icon" imgSize={16} onClick={() => handleRemoveClick(index)} />
          </ul>
        )}
      </section>
    )
  }

  return (
    <BaseContainer header="Transaction Details Upload" buttonText="Continue">
      <section className={styles.title_wrapper}>
        <h4>Upload Supporting Documents(optional)</h4>
        <h5 className={styles.type_wrapper}>JPG, PNG and PDF Files Up to 1MB</h5>
      </section>
      <section className={`flex-col-center ${styles.card_wrapper}`}>
        <ImageView src={assets.ic_upload} alt={"Upload_icon"} imgSize={45} />
        <h4>Browse file from your device</h4>
        <Button onClick={onBrowseClick} className={styles.button_wrapper}>
          Browse
        </Button>
        <input type="file" ref={fileInputRef} onChange={onFileChange} style={{display: "none"}} />
      </section>
      <ul>{uploadedFiles.map(renderAddAttachments)}</ul>
    </BaseContainer>
  )
}

export default AddAttachment

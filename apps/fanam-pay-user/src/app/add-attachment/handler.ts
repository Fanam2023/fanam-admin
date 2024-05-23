import {useRef, useState} from "react"
import {AddAttachmentProps} from "props"

export const useAddAttachment = () => {
  const [fileUploaded, setFileUploaded] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<AddAttachmentProps[]>([])
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleBrowseClick = (files: FileList) => {
    const fileDetails = Array.from(files).map(file => ({
      name: file.name,
      size: `${(file.size / 1024).toFixed(2)} KB`,
    }))
    setUploadedFiles(prevFiles => [...prevFiles, ...fileDetails])
    setFileUploaded(true)
  }

  const handleRemoveClick = (index: number) => {
    const newFiles = [...uploadedFiles]
    newFiles.splice(index, 1)
    setUploadedFiles(newFiles)
    if (newFiles.length === 0) {
      setFileUploaded(false)
    }
  }

  const onBrowseClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files && files.length > 0) {
      handleBrowseClick(files)
    }
  }

  return {
    fileUploaded,
    uploadedFiles,
    fileInputRef,
    onFileChange,
    handleBrowseClick,
    handleRemoveClick,
    onBrowseClick,
  }
}

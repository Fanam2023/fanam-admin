import {useRef, useState} from "react"
import {AddAttachmentProps} from "props"

export const useAddAttachment = () => {
  const [fileUploaded, setFileUploaded] = useState(false)
  const [selFiles, setSelFiles] = useState<AddAttachmentProps[]>([])
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const onBrowse = (files: FileList) => {
    const fileDetails = Array.from(files).map(file => ({
      name: file.name,
      size: `${(file.size / 1024).toFixed(2)} KB`,
    }))
    setSelFiles(prevFiles => [...prevFiles, ...fileDetails])
    setFileUploaded(true)
  }

  const onRemove = (index: number) => {
    const newFiles = [...selFiles]
    newFiles.splice(index, 1)
    setSelFiles(newFiles)
    if (newFiles.length === 0) setFileUploaded(false)
  }

  const onBrowseClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files?.length) onBrowse(files)
  }

  return {
    selFiles,
    fileInputRef,
    onFileChange,
    onBrowse,
    onRemove,
    onBrowseClick,
  }
}

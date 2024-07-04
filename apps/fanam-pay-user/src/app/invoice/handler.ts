import {useRouter} from "next/navigation"
import {useRef, useState} from "react"
import {AddAttachmentProps} from "props"
import {ROUTE_RECIPIENTS} from "utils"

export const useHandler = () => {
  const [selFiles, setSelFiles] = useState<AddAttachmentProps[]>([])
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const {push} = useRouter()
  const onUpload = () => push(ROUTE_RECIPIENTS)

  const onBrowse = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const onAttachment = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files?.length) {
      const fileDetails = Array.from(files).map(file => ({
        name: file.name,
        size: `${(file.size / 1024).toFixed(2)} KB`,
      }))
      setSelFiles(prevFiles => [...prevFiles, ...fileDetails])
    }
  }

  const onRemove = (index: number) => {
    setSelFiles(prevFiles => {
      const newFiles = [...prevFiles]
      newFiles.splice(index, 1)
      return newFiles
    })
  }

  return {
    selFiles,
    fileInputRef,
    onBrowse,
    onUpload,
    onRemove,
    onAttachment,
  }
}

import {useRouter} from "next/navigation"
import {useState} from "react"

export const useBaseContainer = () => {
  const {back} = useRouter()
  const goBack = () => {
    if (back) back()
  }

  const [selIndex, setSelIndex] = useState(3)

  return {
    goBack,
    selIndex,
  }
}

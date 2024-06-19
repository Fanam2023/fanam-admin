import {useRouter} from "next/navigation"

export const useHandler = () => {
  const {back} = useRouter()
  const goBack = () => {
    if (back) back()
  }

  return {
    goBack,
  }
}

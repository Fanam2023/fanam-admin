import {useState} from "react"

export const useHandler = () => {
  const [searchTerm, setSearchTerm] = useState("")

  return {
    searchTerm,
    setSearchTerm,
  }
}

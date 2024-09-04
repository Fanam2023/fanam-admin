import {useState} from "react"
import {useQuery} from "@tanstack/react-query"
import {useLocationController} from "controller"
import {QUERY_COUNTRIES} from "utils"

export const useHandler = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const {getAllCountries} = useLocationController()
  const {data: allCountries = []} = useQuery({queryKey: [QUERY_COUNTRIES], queryFn: getAllCountries})

  return {
    allCountries,
    searchTerm,
    setSearchTerm,
  }
}

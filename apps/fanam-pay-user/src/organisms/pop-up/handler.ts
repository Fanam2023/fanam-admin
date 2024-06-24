import {useState} from "react"
import {useQuery} from "@tanstack/react-query"
import {useCountryController} from "controller/country"
import {QUERY_COUNTRY} from "utils"

const useCountries = () => {
  const {getAllCountries} = useCountryController()
  const [selectedCountryId, setSelectedCountryId] = useState<number | null>(null)

  const {
    data: countries,
    isLoading,
    error,
  } = useQuery({
    queryKey: [QUERY_COUNTRY],
    queryFn: getAllCountries,
  })

  const handleClick = (countryId: number) => {
    setSelectedCountryId(prevId => (prevId === countryId ? null : countryId))
  }

  return {
    countries,
    isLoading,
    error,
    handleClick,
    selectedCountryId,
  }
}

export default useCountries

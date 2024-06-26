import {useState} from "react"
import {useQuery} from "@tanstack/react-query"
import {useLocationController} from "controller/location"
import {QUERY_COUNTRIES} from "utils"

const useHandler = () => {
  const {getAllCountries} = useLocationController()
  const [selectedCountryId, setSelectedCountryId] = useState<number | null>(null)

  const {
    data: countries,
    isLoading,
    error,
  } = useQuery({
    queryKey: [QUERY_COUNTRIES],
    queryFn: getAllCountries,
  })

  const onSelect = (countryId: number) => {
    setSelectedCountryId(prevId => (prevId === countryId ? null : countryId))
  }

  return {
    countries,
    isLoading,
    error,
    onSelect,
    selectedCountryId,
  }
}

export default useHandler

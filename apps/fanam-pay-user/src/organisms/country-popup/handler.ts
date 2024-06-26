import {useQuery} from "@tanstack/react-query"
import {useLocationController} from "controller/location"
import {QUERY_COUNTRIES} from "utils"

const useHandler = () => {
  const {getAllCountries} = useLocationController()

  const {
    data: countries,
    isLoading,
    error,
  } = useQuery({
    queryKey: [QUERY_COUNTRIES],
    queryFn: getAllCountries,
  })

  return {
    countries,
    isLoading,
    error,
  }
}

export default useHandler

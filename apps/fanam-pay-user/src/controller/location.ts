import {API_COUNTRIES, ICountry, apiCountries} from "@custom/utils"
import {useApi} from "./api"

export const useLocationController = () => {
  const {getRequest} = useApi()

  const getAllCountries = async () => {
    const {result} = await getRequest<ICountry[]>(API_COUNTRIES)
    return result
  }

  const getByCountryId = async (country_id: string) => {
    const {result} = await getRequest<ICountry>(apiCountries(country_id))
    return result
  }

  return {
    getAllCountries,
    getByCountryId,
  }
}

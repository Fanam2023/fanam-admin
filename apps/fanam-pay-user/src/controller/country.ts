import {API_COUNTRIES, ICountries, ICountry, apiCountries} from "@custom/utils"
import {useApi} from "./api"

export const useCountryController = () => {
  const {getRequest} = useApi()

  const getAllCountries = async () => {
    const {result} = await getRequest<ICountry[]>(API_COUNTRIES)
    return result
  }

  const getByCountryId = async (country_id: string) => {
    const {result} = await getRequest<ICountries>(apiCountries(country_id))
    return result
  }

  return {
    getAllCountries,
    getByCountryId,
  }
}

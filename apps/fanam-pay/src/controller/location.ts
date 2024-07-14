import {API_COUNTRIES, ICity, ICountry, IState, apiCities, apiStates} from "@custom/utils"
import {useApi} from "./api"

export const useLocationController = () => {
  const {getRequest} = useApi()

  const getAllCountries = async () => {
    const {result} = await getRequest<ICountry[]>(API_COUNTRIES)
    return result || []
  }

  const getStates = async (countryId: string) => {
    const {result} = await getRequest<IState[]>(apiStates(countryId))
    return result || []
  }

  const getCities = async (stateId: string) => {
    const {result} = await getRequest<ICity[]>(apiCities(stateId))
    return result || []
  }

  return {
    getAllCountries,
    getStates,
    getCities,
  }
}

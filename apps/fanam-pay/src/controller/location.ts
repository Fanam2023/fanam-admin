import {apiCities, apiCountries, apiStates, ICity, ICountry, IState} from "@custom/utils"
import {useSingleton} from "hooks"
import {useApi} from "./api"

export const useLocationController = () => {
  const {getRequest} = useApi()
  const {user} = useSingleton()

  const getAllCountries = async () => {
    const {result} = await getRequest<ICountry[]>(apiCountries())
    return result || []
  }

  const getTransactionCountries = async () => {
    const {country} = user || {}
    const {result} = await getRequest<ICountry[]>(apiCountries(country?.country_id))
    return result || []
  }

  const getStates = async (countryId: number) => {
    const {result} = await getRequest<IState[]>(apiStates(countryId))
    return result || []
  }

  const getCities = async (stateId: number) => {
    const {result} = await getRequest<ICity[]>(apiCities(stateId))
    return result || []
  }

  return {
    getAllCountries,
    getStates,
    getCities,
    getTransactionCountries,
  }
}

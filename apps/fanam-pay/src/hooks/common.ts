import {useCommon as usePkgCommon} from "@fanam-pkg/core-utils"
import {getExampleNumber} from "libphonenumber-js"
import examples from "libphonenumber-js/mobile/examples"
import {CountryCode} from "libphonenumber-js/types"
import {ICountry} from "@custom/utils"

export const useCommon = () => {
  const commonHook = usePkgCommon()

  const getNationalNumber = (countryCode: string): string | undefined => {
    const exampleNumber = getExampleNumber(countryCode as CountryCode, examples)
    return exampleNumber ? exampleNumber.nationalNumber.toString() : undefined
  }

  const getCountryCode = (country: ICountry | string): string => {
    return typeof country === "string" ? country : country?.iso2?.toUpperCase()
  }

  const getFirstLetter = (name: string) => {
    const names = name?.split(" ")
    const initials = names?.map(name => name.charAt(0).toUpperCase())
    return initials?.join("")
  }

  return {
    ...commonHook,
    getCountryCode,
    getFirstLetter,
    getNationalNumber,
  }
}

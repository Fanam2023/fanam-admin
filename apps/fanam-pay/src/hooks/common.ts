import {useCommon as usePkgCommon} from "@fanam-pkg/core-utils"
import {ICountry} from "@custom/utils"

export const useCommon = () => {
  const commonHook = usePkgCommon()

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
  }
}

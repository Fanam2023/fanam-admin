import {useCommon as usePkgCommon} from "@fanam-pkg/core-utils"
import {ICountry} from "@custom/utils"

export const useCommon = () => {
  const commonHook = usePkgCommon()
  const getFlagUrl = (country: ICountry | string): string => {
    const iso2 = typeof country === "string" ? country : country?.iso2
    return `https://flagcdn.com/w40/${iso2?.toLowerCase()}.png`
  }

  const getFirstLetter = (name: string) => {
    const names = name?.split(" ")
    const initials = names?.map(name => name.charAt(0).toUpperCase())
    return initials?.join("")
  }

  return {
    ...commonHook,
    getFlagUrl,
    getFirstLetter,
  }
}

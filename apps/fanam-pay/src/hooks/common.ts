import {useCommon as usePkgCommon} from "@fanam-pkg/core-utils"
import {ICountry} from "@custom/utils"
import {useSingleton} from "hooks"

export const useCommon = () => {
  const commonHook = usePkgCommon()
  const {bankName} = useSingleton()

  const getCountryCode = (country: ICountry | string): string => {
    return typeof country === "string" ? country : country?.iso2?.toUpperCase()
  }

  const getFirstLetter = (name: string) => {
    const names = name?.split(" ")
    const initials = names?.map(name => name.charAt(0).toUpperCase())
    return initials?.join("")
  }

  const createParams = (bankName: string) => {
    const data = new URLSearchParams({bank_name: bankName}).toString()
    return data
  }

  const getBankName = (bank_name: string) => {
    if (bank_name === "Hdfc_bank") return "hdfc-assets"
    else if (bank_name === "Yes_bank") return "yes-bank-assets"
    else if (bank_name === "City_union_bank") return "cub-assets"
    else if (bank_name === "Icici_bank") return "icici-bank-assets"
    else if (bank_name === "Sbi_bank") return "sbi-assets"
  }

  const AZURE_BASE_URL = `https://fanampayin.blob.core.windows.net/fe-sample-assets/${getBankName(bankName)}/`

  return {
    ...commonHook,
    getCountryCode,
    getFirstLetter,
    createParams,
    AZURE_BASE_URL,
  }
}

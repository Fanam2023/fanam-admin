import {useCommon as usePkgCommon} from "@fanam-pkg/core-utils"

export const useCommon = () => {
  const commonHook = usePkgCommon()
  const getFlagUrl = (iso2: string): string => {
    return `https://flagcdn.com/w40/${iso2.toLowerCase()}.png`
  }

  return {
    ...commonHook,
    getFlagUrl,
  }
}

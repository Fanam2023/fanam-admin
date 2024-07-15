import { ICountry } from "@custom/utils"

export interface CountryPopupProps {
  onSelect: (currencyCode: ICountry) => void
  selCountry: ICountry
  countries: ICountry[]
}

export interface CountryFlagProps {
  sourceCountry?: ICountry
  destinationCountry?: ICountry
}

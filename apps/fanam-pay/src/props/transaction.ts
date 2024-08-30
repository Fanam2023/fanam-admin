import {ICountry} from "@custom/utils"

export interface CountryPopupProps {
  onSelect: (currencyCode: ICountry) => void
  selCountry: ICountry
  countries: ICountry[]
}

export interface ITransfer {
  image: string
  time: string
  charge: string
}

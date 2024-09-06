import {ICountry} from "@custom/utils"

export interface CountryPopupProps {
  onSelect: (currencyCode: ICountry) => void
  selCountry: ICountry | null
}

export interface ITransfer {
  image: string
  time: string
  charge: string
}
export interface RecipientInfo {
  label: string;
  value: string;
}

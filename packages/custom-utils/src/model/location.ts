// import {StaticImageData} from

export interface ICountry {
  country_id: number
  country_name: string
  currency: string
  currency_symbol: string
  emoji: string
  emojiU: string
  phone_code: string
  iso2: string
  iso3: string
}

export interface ICorridors {
  source_country: ISourceCountry
  destination_country: ISourceCountry
  conversion_rate: number
}

export interface ISourceCountry extends ICountry {
  numeric_code: string
  currency_symbol: string
  tld: string
  native: string
  nationality: string
  latitude: string
  longitude: string
  subregion_id: number
}

export interface IState {
  state_id: number
  state_name: string
}

export interface ICity {
  city_id: number
  city_name: string
}

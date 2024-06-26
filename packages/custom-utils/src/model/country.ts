// import {StaticImageData} from

export interface ICountry {
  country_id: number
  country_name: string
  currency: string
  emojiU: string
  phone_code: string
  state: IState[]
}

export interface IState {
  state_id: number
  state_name: string
}

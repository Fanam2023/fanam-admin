import {IFormData} from "@fanam-pkg/core-utils"
import {TypeRelation} from "./enum"
import {ICity, ICountry, IState} from "./location"

export type IBeneficiary = {
  first_name: string
  last_name: string
  email: string
  // country_code?: string
  phone_no: string
  country: ICountry
  address: string
  state: IState
  city: ICity
  zip_code: string
  relationship: string
  transaction_id: string
  beneficiary_id?: string
  account_no?: string
}

export interface IBaseBeneficiary {
  first_name: string
  last_name: string
  email: string
  phone_no: string
  address: string
  zip_code: string
  relationship: TypeRelation
  account_no?: string
}

export interface IBeneficiaryData extends IBaseBeneficiary {
  country: IFormData<number> | null
  state: IFormData<number> | null
  city: IFormData<number> | null
}

export interface IPayloadBeneficiary extends IBaseBeneficiary {
  country_id: number
  state_id: number
  city_id: number
  transaction_id: string
}

export interface IPayloadUpdateBeneficiary extends IPayloadBeneficiary {
  beneficiary_id?: string
}

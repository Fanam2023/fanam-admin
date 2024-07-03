import {IFormData} from "@fanam-pkg/core-utils"
import {ICity, ICountry, IState} from "./location"

export type IBeneficiary = {
  beneficiary_name: string
  email: string
  // country_code?: string
  phone_no: string
  country: ICountry
  address_line1: string
  address_line2: string
  state: IState
  city: ICity
  zip_code: string
  relationship: string
  transaction_id: string
  beneficiary_id?: string
}

export interface IBaseBeneficiary {
  beneficiary_name: string
  email: string
  phone_no: string
  address_line1: string
  address_line2: string
  zip_code: string
  relationship: string
}

export interface IBeneficiaryData extends IBaseBeneficiary {
  country: IFormData | null
  state: IFormData | null
  city: IFormData | null
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

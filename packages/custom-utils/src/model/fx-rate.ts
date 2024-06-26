export interface IPayloadFxRate {
  source_currency: string
  destination_currency: string
  source_amount: string
}

export interface IResponseFxRate extends IPayloadFxRate {
  destination_amount: string
}

import {IFormData} from "@fanam-pkg/core-utils"
import {ICountry, IResponseFxRate, ITransaction, ITransferTime} from "@custom/utils"

export interface CountryPopupProps {
  onSelect: (currencyCode: ICountry) => void
  selCountry: ICountry | null
}

export interface ITransfer {
  image: string
  time: string
  charge: string
}

export interface PropsTransferTime {
  onSelect: (transfer: ITransferTime) => void
  transferTimeRes: IResponseFxRate
}

export interface ITransactionInfo {
  label: string
  value: string | number
}

export interface PropsTransactionDetails {
  transaction: ITransaction
}

export interface ITransactionProps {
  transactionDetail?: ITransaction
  recipientData?: IFormData[]
}

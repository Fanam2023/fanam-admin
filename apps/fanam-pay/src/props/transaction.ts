import {IFormData} from "@fanam-pkg/core-utils"
import {ICountry, ITransaction} from "@custom/utils"

export interface CountryPopupProps {
  onSelect: (currencyCode: ICountry) => void
  selCountry: ICountry | null
}

export interface ITransfer {
  image: string
  time: string
  charge: string
}

export interface ITransactionInfo {
  label: string
  value: string | number
}

export interface ListTransactionProps {
  transactionId: string
}

export interface ITransactionProps {
  transactionDetail?: ITransaction
  recipientData?: IFormData[]
}

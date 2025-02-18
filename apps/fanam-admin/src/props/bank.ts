import {IBank} from "model"

export interface BankDetailsProp {
  details?: IBank
  refetch?: () => void
}

import {IAction, TableHeaderProps} from "@fanam-pkg/core-ui-sass"
import {useMemo} from "react"
import {BANK_LIST} from "utils"

export const useHandler = () => {
  const TABLE_HEADER: TableHeaderProps[] = [
    {rowKey: "index", title: "#"},
    {rowKey: "bankid", title: "Bank ID"},
    {rowKey: "bankname", title: "Bank name"},
    {rowKey: "email", title: "E-mail"},
    {rowKey: "mobile", title: "Mobile"},
    {rowKey: "contactPerson", title: "Contact person"},
    {rowKey: "action", title: "Action"},
  ]

  const bankData = useMemo(
    () =>
      BANK_LIST?.map((item, index: number) => {
        const action: IAction[] = [{label: "View", action: "view", onClick: undefined}]

        return {
          ...item,
          index: index + 1,

          action,
        }
      }) || [],
    [BANK_LIST]
  )
  return {
    TABLE_HEADER,

    bankData,
  }
}

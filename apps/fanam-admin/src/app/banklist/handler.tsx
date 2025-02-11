import {IAction, TableHeaderProps} from "@fanam-pkg/core-ui-sass"
import {BANK_LIST} from "app/utils/constant"
import {useRouter} from "next/navigation"
import {useMemo} from "react"

export const useHandler = () => {
  const router = useRouter()
  const TABLE_HEADER: TableHeaderProps[] = [
    {rowKey: "index", title: "#"},
    {rowKey: "bankid", title: "Bank ID"},
    {rowKey: "bankname", title: "Bank name"},
    {rowKey: "email", title: "E-mail"},
    {rowKey: "mobile", title: "Mobile"},
    {rowKey: "contactPerson", title: "Contact person"},
    {rowKey: "action", title: "Action"},
  ]

  const handledit = () => {
    router.push("banklist/edit")
  }

  const bankData = useMemo(
    () =>
      BANK_LIST?.map((item, index: number) => {
        const action: IAction[] = [
          {label: "View", action: "view", onClick: undefined},
          {label: "Edit", action: "edit", onClick: handledit},
        ]

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

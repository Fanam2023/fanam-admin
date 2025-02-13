import {IAction, TableHeaderProps} from "@fanam-pkg/core-ui-sass"
import {useMemo} from "react"
import {useQuery} from "@tanstack/react-query"
import {useSlider} from "@custom/ui"
import {useBankController} from "controller"
import {CreateBankDetails} from "organisms"
import {QUERY_BANK} from "utils"

export const useHandler = () => {
  const {toggleSlider} = useSlider()
  const {getAllBanks} = useBankController()

  const {data: allBanks} = useQuery({
    queryKey: [QUERY_BANK],
    queryFn: getAllBanks,
  })

  const onAdd = () => {
    toggleSlider({
      children: <CreateBankDetails />,
      title: "Create Bank",
    })
  }

  const TABLE_HEADER: TableHeaderProps[] = [
    {rowKey: "index", title: "#"},
    {rowKey: "client_id", title: "Bank Id"},
    {rowKey: "bank_name", title: "Bank name"},
    {rowKey: "email", title: "E-mail"},
    {rowKey: "mobile", title: "Mobile"},
    {rowKey: "contact_person_name", title: "Contact person"},
    {rowKey: "action", title: "Action"},
  ]

  const bankData = useMemo(
    () =>
      allBanks?.map((item, index: number) => {
        const action: IAction[] = [{label: "View", action: "view", onClick: undefined}]

        return {
          ...item,
          index: index + 1,
          action,
        }
      }) || [],
    [allBanks]
  )

  return {
    TABLE_HEADER,
    bankData,

    onAdd,
  }
}

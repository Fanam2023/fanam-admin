import {Button, IAction, TableHeaderProps, usePopup} from "@fanam-pkg/core-ui-sass"
import {useRouter} from "next/navigation"
import {useMemo} from "react"
import {useQuery} from "@tanstack/react-query"
import {useSlider} from "@custom/ui"
import {useBankController} from "controller"
import {CreateBankDetails} from "organisms"
import {QUERY_BANK, routeToBankDetail} from "utils"
import styles from "./page.module.sass"

export const useHandler = () => {
  const {togglePopup, closable} = usePopup()
  const {toggleSlider} = useSlider()
  const {getAllBanks} = useBankController()
  const {push} = useRouter()

  const handleDeleteClick = () => {
    togglePopup({
      title: "Delete Confirm",
      children: (
        <section className={styles.modal_dialog}>
          <section className={styles.modal_content}>
            {/* <section className={styles.modal_header}>
              <h5 className={styles.modal_title}>Confirm Deletion</h5>
            </section> */}
            <section className={styles.modal_body}>
              <p>Are you sure you want to delete?</p>
            </section>
            <section className={styles.modal_footer}>
              <Button wrapperClass={styles.discard_btn} onClick={handleDiscard}>
                Discard
              </Button>
              <Button wrapperClass={styles.confirm_btn} onClick={handleDeleteConfirm}>
                Delete
              </Button>
            </section>
          </section>
        </section>
      ),
      isClosable: false,
    })
  }

  const handleDiscard = () => {
    togglePopup({
      title: "",
      children: null,
      isClosable: false,
    })
  }

  const handleDeleteConfirm = () => {
    togglePopup({
      title: "",
      children: null,
      isClosable: false,
    })
  }

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

  const routeToDetail = (client_id: string) => push(routeToBankDetail(client_id))

  const bankData = useMemo(
    () =>
      allBanks?.map((item, index: number) => {
        const {client_id} = item || {}
        const action: IAction[] = [
          {label: "View", action: "view", onClick: routeToDetail.bind(null, client_id)},
          {label: "Delete", action: "delete", onClick: handleDeleteClick},
        ]

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
    handleDeleteClick,
    handleDiscard,
    handleDeleteConfirm,
    togglePopup,
  }
}

"use client"

import {FormSectionProps, TextField, usePopup} from "@fanam-pkg/core-ui-sass"
import {DF_INPUT_DATE, IFormData, JSONObject, useDateTime} from "@fanam-pkg/core-utils"
import {useMemo, useState} from "react"
import {useMutation, useQuery} from "@tanstack/react-query"
import {IQueryTransaction, IStyle, TypeOrderStatus} from "@custom/utils"
import {useTransactionController} from "controller"
import {TransactionDetails} from "organisms"
import {QUERY_TRANSACTION, TRANSACTION_STATUS_OBJECT} from "utils"

export const useHandler = (styles: IStyle) => {
  const {getTransaction, getTransactionDetails} = useTransactionController()
  const {togglePopup} = usePopup()
  const {formatDate, formatDateUTC, dayjs} = useDateTime()

  const formattedStatusOptions: IFormData<TypeOrderStatus | "">[] = useMemo(
    () => [
      {key: "", label: "All"},
      ...Object.keys(TRANSACTION_STATUS_OBJECT).map(key => ({
        key: key as TypeOrderStatus,
        label: TRANSACTION_STATUS_OBJECT[key]?.label,
      })),
    ],
    []
  )

  const [data, setData] = useState<IQueryTransaction>({
    status: formattedStatusOptions[0],
    start_date: "",
    end_date: "",
  })

  const {status, start_date, end_date} = data

  const {data: transactions = []} = useQuery({
    queryKey: [QUERY_TRANSACTION, status.key, start_date, end_date],
    queryFn: () =>
      getTransaction(status.key, start_date ? formatDateUTC(start_date) : "", end_date ? formatDateUTC(end_date) : ""),
    refetchInterval: 60000,
  })

  const {mutate: fetchTransaction} = useMutation({
    mutationFn: getTransactionDetails,
    onSuccess: transaction => {
      if (transaction)
        togglePopup({
          children: <TransactionDetails transaction={transaction} />,
        })
    },
  })

  const onChangeValue = (value: JSONObject) => setData(prev => ({...prev, ...value}))

  const currentDate = dayjs().format(DF_INPUT_DATE)

  const formElements: FormSectionProps[] = [
    {
      wrapperClassGrid: styles.filter_wrapper,
      childElements: [
        {
          elementType: "drop-down",
          isRequired: false,
          options: formattedStatusOptions,
          name: "status",
          value: status,
          onChangeValue,
          wrapperClass: styles.status_drop_down,
        },
        {
          childElement: (
            <section className={styles.date_filter_wrapper}>
              <TextField
                onChangeData={onChangeValue}
                value={start_date}
                name="start_date"
                type="date"
                isRequired={false}
                max={currentDate}
                label="Start Date"
                onKeyDown={e => e.preventDefault()} // Disable typing
              />
              <TextField
                onChangeData={onChangeValue}
                value={end_date}
                isRequired={false}
                name="end_date"
                type="date"
                label="End Date"
                min={formatDate(start_date, DF_INPUT_DATE)}
                max={currentDate}
                wrapperClass={styles.end_date_wrapper}
                onKeyDown={e => e.preventDefault()} // Disable typing
              />
            </section>
          ),
        },
      ],
    },
  ]

  return {
    transactions,
    formElements,
    fetchTransaction,
  }
}

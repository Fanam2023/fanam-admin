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
    queryFn: () => getTransaction(status.key, start_date, end_date),
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

  const onChangeStartDate = (value: JSONObject) => {
    const formattedStartDate = formatDateUTC(value?.start_date as string)
    onChangeValue({
      ...value,
      start_date: formattedStartDate,
    })
  }

  const onChangeEndDate = (value: JSONObject) => {
    const formattedEndDate = formatDateUTC(value?.end_date as string)
    onChangeValue({
      ...value,
      end_date: formattedEndDate,
    })
  }

  const currentDate = dayjs().format("YYYY-MM-DD")

  const formElements: FormSectionProps[] = [
    {
      wrapperClassGrid: styles.filter_wrapper,
      childElements: [
        {
          elementType: "drop-down",
          options: formattedStatusOptions,
          name: "status",
          value: status,
          onChangeValue,
        },
        {
          childElement: (
            <>
              <TextField
                onChangeData={onChangeStartDate}
                value={formatDate(start_date, DF_INPUT_DATE)}
                name="start_date"
                type="date"
                max={currentDate}
                label="Start Date"
              />
              <TextField
                onChangeData={onChangeEndDate}
                value={formatDate(end_date, DF_INPUT_DATE)}
                name="end_date"
                type="date"
                max={currentDate}
                label="End Date"
              />
            </>
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

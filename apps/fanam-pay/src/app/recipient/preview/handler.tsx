import {JSONObject, useResize} from "@fanam-pkg/core-utils"
import {useRouter} from "next/navigation"
import {useEffect, useState} from "react"
import {useMutation} from "@tanstack/react-query"
import {useSlider} from "@custom/ui"
import {IMergeRecipientData} from "@custom/utils"
import {useTransactionController} from "controller"
import {CreateRecipientDetails} from "organisms"
import {
  QUERY_TRANSACTION,
  RELATION_SHIP,
  ROUTE_BENEFICIARIES,
  ROUTE_BENEFICIARY_PREVIEW,
  ROUTE_TRANSACTION_PURPOSE,
} from "utils"

export const useHandler = () => {
  const {push, back} = useRouter()
  const {toggleSlider} = useSlider()
  const {isDesktop} = useResize()
  const {syncRecipientAsBeneficiary} = useTransactionController()
  const [data, setData] = useState<IMergeRecipientData>({
    is_same_person: {isSelected: false},
    recipient_relationship: RELATION_SHIP[0],
  })
  const [errData, setErrData] = useState(DEFAULT_ERR_STATE)
  const {is_same_person, recipient_relationship} = data
  const {isClicked} = errData

  const isSamePerson = is_same_person.isSelected

  const onRouteToBeneficiary = () => push(ROUTE_BENEFICIARIES)

  const onBack = () => back()

  const {mutate: linkRecipientAsBeneficiary} = useMutation({
    mutationKey: [QUERY_TRANSACTION],
    mutationFn: syncRecipientAsBeneficiary,
    onSuccess: ({result}) => {
      const {is_same_person, relationship} = result?.recipient || {}
      push(is_same_person || relationship ? ROUTE_TRANSACTION_PURPOSE : ROUTE_BENEFICIARY_PREVIEW)
    },
  })

  const onToggle = (recipient_id: string) => {
    toggleSlider({
      children: <CreateRecipientDetails recipient_id={recipient_id} />,
      title: "Edit Recipient Details",
    })
  }

  useEffect(() => {
    if (isClicked) setErrData(prev => ({...prev, ...onValidate()}))
  }, [isClicked, data])

  const onValidate = () => {
    let errState = {...DEFAULT_ERR_STATE, isValid: true, isClicked: true}

    if (isSamePerson && !recipient_relationship)
      errState = {...errState, errRelationShip: "Please select a relationship with recipient", isValid: false}

    setErrData(errState)
    return errState
  }

  const onChangeValue = (value: JSONObject) => setData(prev => ({...prev, ...value}))

  const onSubmit = () => {
    const {isValid} = onValidate()

    if (isSamePerson) {
      if (isValid)
        linkRecipientAsBeneficiary({is_same_person: isSamePerson, recipient_relationship: recipient_relationship.key})
    } else onRouteToBeneficiary()
  }

  return {
    onRouteToBeneficiary,
    toggleSlider,
    isDesktop,
    onToggle,
    onBack,
    data,
    isSamePerson,
    errData,
    onSubmit,
    onChangeValue,
  }
}

const DEFAULT_ERR_STATE = {
  isValid: false,
  isClicked: false,
  errRelationShip: "",
}

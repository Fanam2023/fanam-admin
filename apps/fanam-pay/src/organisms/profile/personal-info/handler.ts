import {FormSectionProps} from "@fanam-pkg/core-ui-sass"
import {DF_INPUT_DATE, useDateTime} from "@fanam-pkg/core-utils"
import {useTranslation} from "react-i18next"
import {REG_INPUT_NAME} from "@custom/utils"
import {useSingleton} from "hooks"

const useHandler = () => {
  const {user} = useSingleton()
  const {t} = useTranslation()

  const individualType = user?.account_type === "Individual"

  const {formatDate} = useDateTime()

  const {first_name, last_name, phone_no, date_of_birth} = user || {}

  const formElements: FormSectionProps[] = [
    {
      title: t("Personal Information"),
      childElements: [
        {
          elementType: "input",
          isRequired: false,
          label: t("First Name"),
          name: "first_name",
          value: first_name,
          inputRegex: REG_INPUT_NAME,
          disabled: !!user?.first_name,
        },
        {
          elementType: "input",
          isRequired: false,
          label: t("Last Name"),
          name: "last_name",
          value: last_name,
          inputRegex: REG_INPUT_NAME,
          disabled: !!user?.last_name,
        },

        {
          elementType: "input",
          isRequired: false,
          label: t("Phone Number"),
          name: "phone_no",
          value: phone_no,
          disabled: !!user?.phone_no,
        },
      ],
    },
  ]

  if (individualType) {
    formElements.push({
      childElements: [
        {
          elementType: "input",
          isRequired: false,
          type: "text",
          label: t("Date of Birth"),
          name: "date_of_birth",
          value: date_of_birth ? formatDate(date_of_birth, DF_INPUT_DATE) : "-",
          disabled: !!user?.date_of_birth,
        },
      ],
    })
  }
  return {
    formElements,
  }
}

export default useHandler

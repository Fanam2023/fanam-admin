import {FormSectionProps} from "@fanam-pkg/core-ui-sass"
import {useDateTime} from "@fanam-pkg/core-utils"
import {useSingleton} from "hooks"

const useHandler = () => {
  const {user} = useSingleton()

  const {formatDate} = useDateTime()

  const {first_name, last_name, phone_no, date_of_birth} = user || {}

  const formElements: FormSectionProps[] = [
    {
      title: "Personal Information",
      childElements: [
        {
          elementType: "input",
          label: "First Name",
          name: "first_name",
          value: first_name,
          disabled: !!user?.first_name,
        },
        {
          elementType: "input",
          label: "Last Name",
          name: "last_name",
          value: last_name,
          disabled: !!user?.last_name,
        },

        {
          elementType: "input",
          label: "Phone Number",
          name: "phone_no",
          value: phone_no,
          disabled: !!user?.phone_no,
        },
        {
          elementType: "input",
          type: "date",
          label: "Date of Birth",
          name: "date_of_birth",
          value: formatDate(date_of_birth),
          disabled: !!user?.date_of_birth,
        },
      ],
    },
  ]

  return {
    formElements,
  }
}

export default useHandler

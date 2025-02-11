import {FormSectionProps} from "@fanam-pkg/core-ui-sass"

export const editHandler = () => {
  const editForm: FormSectionProps = {
    title: "Basic Details",
    childElements: [
      {
        elementType: "input",
        label: "Bank name",
        name: "bank_name",
      },
      {
        elementType: "input",
        label: "Mobile",
        name: "mobile",
      },
      {
        elementType: "input",
        label: "Contact person",
        name: "contactperson",
      },
      {
        elementType: "input",
        label: "E-mail",
        name: "email",
      },
      {
        elementType: "input",
        label: "Alternative mobile",
        name: "alternativemobile",
      },
      {
        elementType: "input",
        label: "Designation",
        name: "designation",
      },
    ],
  }

  return {editForm}
}

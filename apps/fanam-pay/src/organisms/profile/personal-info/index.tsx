import {GroupForm} from "@fanam-pkg/core-ui-sass"
import useHandler from "./handler"

export const PersonalInformation = () => {
  const {formElements} = useHandler()

  return <GroupForm formSections={formElements} />
}

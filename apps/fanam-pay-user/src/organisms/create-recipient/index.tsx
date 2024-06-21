import {FormSectionProps, GroupForm, useNotifyPopup} from "@fanam-pkg/core-ui-sass"
import {useResize} from "@fanam-pkg/core-utils"
import {BaseContainer} from "organisms/base-container"
import {Slider} from "organisms/slider"
import {useHandler} from "./handler"
import styles from "./styles.module.sass"

interface DetailsProp {
  isVisible: boolean
  setIsVisible: (show: boolean) => void
  title: string
}

export const CreateRecipient = ({isVisible, setIsVisible, title}: DetailsProp) => {
  const {isDesktop} = useResize()
  const {toggleNotify} = useNotifyPopup()
  const {errState, onChangeValue, data, onSubmit} = useHandler(onSuccess, () => {})

  function onSuccess() {
    toggleNotify({
      type: "success",
      title: "recipient added",
      description: "recipient added successfully",
    })
  }

  const {recipient_name, email, address, country, city, zip_code, phone_no, state, country_code} = data

  const {errName, errEmail, errPhone, errAddress, errCountryName, errStateName, errCity, errZipCode, errCountryCode} =
    errState

  const formElements: FormSectionProps[] = [
    {
      childElements: [
        {
          elementType: "input",
          label: "Enter Recipient Name",
          name: "recipient_name",
          value: recipient_name,
          error: errName,
          onChangeValue,
        },
        {
          elementType: "input",
          label: "Enter E-Mail ID",
          name: "email",
          error: errEmail,
          value: email,
          onChangeValue,
        },
        {
          elementType: "input",
          label: "Enter Phone Number",
          name: "phone_no",
          value: phone_no,
          error: errPhone,
          onChangeValue,
          maxLength: 10,
        },
        {
          elementType: "input",
          label: "Enter Recipient Address",
          name: "address",
          value: address,
          error: errAddress,
          onChangeValue,
        },
        {
          elementType: "input",
          label: "Enter Country",
          name: "country",
          value: country,
          error: errCountryName,
          onChangeValue,
        },
        {
          elementType: "input",
          label: "Enter State",
          name: "state",
          value: state,
          error: errStateName,
          onChangeValue,
        },
        {
          elementType: "input",
          label: "Enter City/District",
          name: "city",
          value: city,
          error: errCity,
          onChangeValue,
        },
        {
          elementType: "input",
          label: "Enter Zip Code",
          name: "zip_code",
          value: zip_code,
          error: errZipCode,
          onChangeValue,
        },
        {
          elementType: "input",
          label: "Enter your countryCode",
          name: "country_code",
          value: country_code,
          error: errCountryCode,
          onChangeValue,
        },
      ],
    },
  ]

  return (
    <Slider isVisible={isVisible} setIsVisible={setIsVisible} title={title} onClick={onSubmit}>
      <section>
        {isDesktop ? (
          <GroupForm formSections={formElements} wrapperClass={styles.input_wrapper} />
        ) : (
          <BaseContainer buttonText="Submit" header="Beneficiary Details" backIcon>
            <GroupForm formSections={formElements} wrapperClass={styles.input_wrapper} />
          </BaseContainer>
        )}
      </section>
    </Slider>
  )
}

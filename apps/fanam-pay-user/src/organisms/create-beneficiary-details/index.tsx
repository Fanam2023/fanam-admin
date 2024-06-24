import {FormSectionProps, GroupForm} from "@fanam-pkg/core-ui-sass"
import {useResize} from "@fanam-pkg/core-utils"
import {useEffect} from "react"
import {IBeneficiary} from "@custom/utils"
import {BaseContainer, Slider} from "organisms"
import {useHandler} from "./handler"
import styles from "./styles.module.sass"

interface DetailsProp {
  isVisible?: boolean
  setIsVisible?: (show: boolean) => void
  title: string
  wrapperClass?: string
  onClickCreate?: (payload: IBeneficiary) => void
  beneficiaryDetails?: IBeneficiary
  onBack?: () => void
}

export const CreateBeneficiaryDetails = ({
  isVisible,
  setIsVisible,
  title,
  wrapperClass,
  onClickCreate,
  beneficiaryDetails,
  onBack,
}: DetailsProp) => {
  const {isDesktop} = useResize()
  const {errState, onChangeValue, data, onSubmit, onRouteToOptions} = useHandler()

  useEffect(() => {
    onChangeValue({...beneficiaryDetails})
  }, [beneficiaryDetails])

  const {beneficiary_name, email, relationship, address, country, city, zip_code, phone_no, state, country_code} = data

  const {
    errName,
    errEmail,
    errNumber,
    errRelation,
    errAddress,
    errCountry,
    errStateName,
    errCity,
    errZipCode,
    errCountryCode,
  } = errState

  const formElements: FormSectionProps[] = [
    {
      childElements: [
        {
          elementType: "input",
          label: "Enter Benificiary Name",
          name: "beneficiary_name",
          value: beneficiary_name,
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
          error: errNumber,
          onChangeValue,
          maxLength: 10,
        },
        {
          elementType: "input",
          label: "Enter Relationship with Sender",
          name: "relationship",
          value: relationship,
          error: errRelation,
          onChangeValue,
        },
        {
          elementType: "input",
          label: "Enter Benificiary Address",
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
          error: errCountry,
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

  const onClickSubmit = () => {
    const payload = onSubmit()
    if (payload) {
      onClickCreate(payload)
      onRouteToOptions()
    }
  }

  return (
    <section>
      {isDesktop ? (
        <Slider isVisible={isVisible} setIsVisible={setIsVisible} title={title} onClick={onClickSubmit}>
          <GroupForm formSections={formElements} wrapperClass={styles.input_wrapper} />
        </Slider>
      ) : (
        <BaseContainer
          buttonText="Submit"
          header="Beneficiary Details"
          onClick={onClickSubmit}
          backIcon
          containerClass={wrapperClass}
          onBack={onBack}
          childWrapper={styles.child_wrapper}>
          <GroupForm formSections={formElements} wrapperClass={styles.input_wrapper} />
        </BaseContainer>
      )}
    </section>
  )
}

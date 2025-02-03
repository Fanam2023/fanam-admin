import {Button, GroupForm} from "@fanam-pkg/core-ui-sass"
import {CountryPopup} from "organisms/country-popup"
import {BeneficiaryDetailsProps} from "props/beneficiary"
import {useHandler} from "./handler"
import styles from "./styles.module.sass"

export const CreateBeneficiaryDetails = ({beneficiary_id}: BeneficiaryDetailsProps) => {
  const {onSubmit, formElements, showCountry, onSelectCountry, selectedCountry, allCountries, setShowCountry, t} =
    useHandler(styles, beneficiary_id)

  return (
    <section>
      {showCountry && (
        <CountryPopup
          onSelect={onSelectCountry}
          selCountry={selectedCountry}
          countries={allCountries}
          title="Select Your Country"
          wrapperClass={styles.main_country_wrapper}
          showCountry={showCountry}
          onShowCountry={setShowCountry}
        />
      )}
      <GroupForm
        formSections={formElements}
        wrapperClass={`${styles.input_wrapper}  ${showCountry ? styles.input_hidden : ""}`}
      />
      <Button wrapperClass={`${styles.btn_wrapper}  ${showCountry ? styles.input_hidden : ""}`} onClick={onSubmit}>
        {beneficiary_id ? t("Update Beneficiary") : t("Add Beneficiary")}
      </Button>
    </section>
  )
}

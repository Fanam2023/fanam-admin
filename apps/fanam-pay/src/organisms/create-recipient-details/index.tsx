import {Button, GroupForm} from "@fanam-pkg/core-ui-sass"
import {CountryPopup} from "organisms/country-popup"
import {RecipientDetailsProp} from "props"
import useHandler from "./handler"
import styles from "./styles.module.sass"

export const CreateRecipientDetails = ({recipient_id}: RecipientDetailsProp) => {
  const {formElements, onSubmit, showCountry, onSelectCountry, selectedCountry, allCountries} = useHandler(
    styles,
    recipient_id
  )

  return (
    <section>
      {showCountry && (
        <CountryPopup
          onSelect={onSelectCountry}
          selCountry={selectedCountry}
          countries={allCountries}
          title="Select Your Country"
          wrapperClass={styles.main_country_wrapper}
          showDropdown={showCountry}
        />
      )}
      <GroupForm
        formSections={formElements}
        wrapperClass={`${styles.input_wrapper} ${showCountry ? styles.input_hidden : ""}`}
      />
      <Button wrapperClass={`${styles.btn_wrapper} ${showCountry ? styles.input_hidden : ""}`} onClick={onSubmit}>
        {recipient_id ? "Update Recipient" : "Add Recipient"}
      </Button>
    </section>
  )
}

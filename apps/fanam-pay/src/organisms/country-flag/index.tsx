import { CountryFlagProps } from "props";
import styles from "./styles.module.sass";

export const CountryFlag = ({sourceCountry, destinationCountry}: CountryFlagProps) => {

  return (
    <section>
      {sourceCountry && (
        <section className={`flex ${styles.flag_wrapper} ${styles.sender_wrapper}`}>
          <img
            src={`https://flagcdn.com/w40/${sourceCountry.iso2.toLowerCase()}.png`}
            alt="country_flag"
            width="40"
            height="40"
            className={styles.country_wrapper}
          />
          <h3 className={styles.currency_text}>{sourceCountry.iso2}</h3>
        </section>
      )}

      {destinationCountry && (
        <section className={`flex ${styles.flag_wrapper} ${styles.sender_wrapper}`}>
          <img
            src={`https://flagcdn.com/w40/${destinationCountry.iso2.toLowerCase()}.png`}
            alt="country_flag"
            width="40"
            height="40"
            className={styles.country_wrapper}
          />
          <h3 className={styles.currency_text}>{destinationCountry.iso2}</h3>
        </section>
      )}
    </section>
  );
};
import {ImageView} from "@fanam-pkg/core-ui-sass"
import {useTranslation} from "react-i18next"
import {ITransferTime} from "@custom/utils"
import assets from "assets"
import {useSingleton} from "hooks"
import {PropsTransferTime} from "props"
import styles from "./styles.module.sass"

export const TransferTime = ({onSelect, transferTimeRes}: PropsTransferTime) => {
  const {transData} = useSingleton()
  const {sourceCountry, transfer_times = []} = transferTimeRes || {}
  const {transfer_time} = transData || {}
  const {currency} = sourceCountry || {}
  const {t} = useTranslation()

  const renderItem = (label: string, value: string, isSelected: boolean) => (
    <li className={`flex-sb-center ${styles.transfer_wrapper}`}>
      <h5 className={`${styles.text} ${isSelected ? styles.selected_text : ""}`}>{label}</h5>
      <h5 className={`${styles.text} ${isSelected ? styles.selected_text : ""}`}>
        {value} {currency}
      </h5>
    </li>
  )

  const renderTransferItem = (item: ITransferTime) => {
    const {sla_timing_max, exchange_rate, markup_fee, other_fees = "", final_rate, transfer_time_id} = item
    const isSelected = transfer_time_id === transfer_time?.transfer_time_id

    return (
      <li
        key={transfer_time_id}
        className={`flex ${styles.transfer_time_wrapper} ${isSelected ? styles.selected_card : ""}`}
        onClick={onSelect.bind(null, item)}>
        <section className={`flex-col ${styles.card} ${isSelected ? styles.selected_image : ""}`}>
          <ImageView
            src={
              sla_timing_max === 24
                ? assets.ic_rocket
                : sla_timing_max === 48
                  ? assets.ic_parachute
                  : assets.ic_delivery
            }
            alt=""
            imgSize={30}
          />
          <h4 className={`bold ${styles.txt_wrapper} ${isSelected ? styles.selected_txt : ""}`}>
            {t(`In ${sla_timing_max} Hours`)}
          </h4>
        </section>
        <ul className={`flex-col ${styles.fees_wrapper}`}>
          {renderItem(t("Exchange Amount"), parseFloat(exchange_rate)?.toFixed(2), isSelected)}
          {renderItem(t("Others"), (parseFloat(other_fees) + parseFloat(markup_fee))?.toFixed(2), isSelected)}
          {renderItem(t("Total"), parseFloat(final_rate)?.toFixed(2), true)}
        </ul>
      </li>
    )
  }

  return (
    <section className={styles.container_wrapper}>
      <h4 className={`semi-bold ${styles.sub_title}`}>{t("Select Remittance Option")}</h4>
      <ul className={`flex-col ${styles.card_wrapper}`}>{transfer_times.map(renderTransferItem)}</ul>
    </section>
  )
}

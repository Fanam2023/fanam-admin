import {ImageView} from "@fanam-pkg/core-ui-sass"
import {useCallback} from "react"
import assets from "assets"
import {ITransferTime} from "props"
import {useHandler} from "./handler"
import styles from "./styles.module.sass"

export const Transfer = ({onSelectChargeAndTime, transferItem}: ITransferTime) => {
  const {defaultData, selectedCard, onSelect, selectedCharge} = useHandler(onSelectChargeAndTime)

  const Card = useCallback(
    ({
      sla_timing_max,
      markup_fee,
      conversion_rate,
      image,
      selected,
      onSelect,
    }: any & {selected: boolean; onSelect: () => void}) => (
      <section className={`flex ${styles.transfer_time_wrapper} ${selected ? styles.selected_card : ""}`}>
        <li className={`flex-col ${styles.card} ${selected ? styles.selected_image : ""}`} onClick={onSelect}>
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
          <h4 className={`bold ${styles.txt_wrapper} ${selected ? styles.selected_txt : ""}`}>In {sla_timing_max}</h4>
        </li>
        <section className={`flex-col ${styles.fees_wrapper}`}>
          <section className={`flex-sb-center ${styles.transfer_wrapper}`}>
            <h5 className={`${styles.text} ${selected ? styles.selected_text : ""}`}>Exchange rate</h5>
            <h5 className={`${styles.text} ${selected ? styles.selected_text : ""}`}>{conversion_rate}INR</h5>
          </section>
          <section className={`flex-sb-center ${styles.transfer_wrapper}`}>
            <h5 className={`${styles.text} ${selected ? styles.selected_text : ""}`}>Fees</h5>
            <h5 className={`${styles.text} ${selected ? styles.selected_text : ""}`}>{markup_fee}</h5>
          </section>
          <section className={`flex-sb-center ${styles.transfer_wrapper}`}>
            <h5 className={`semi-bold ${styles.selected_text}`}>Total</h5>
            <h5 className={`bold ${styles.selected_txt}`}>351.00 INR</h5>
          </section>
        </section>
      </section>
    ),
    [transferItem]
  )
  console.log("sdsfsfd", transferItem)

  return (
    <ul className={styles.container_wrapper}>
      <h4 className="bold">Select Transfer Time</h4>
      <section className={`flex-col ${styles.card_wrapper}`}>
        {transferItem.map((data, index) => (
          <Card
            key={index}
            {...data}
            selected={selectedCard === index}
            onSelect={() => onSelect(data.charge, data.time, index)}
          />
        ))}
      </section>
    </ul>
  )
}

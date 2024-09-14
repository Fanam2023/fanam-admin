import {ImageView} from "@fanam-pkg/core-ui-sass"
import {ITransfer} from "props"
import {useHandler} from "./handler"
import styles from "./styles.module.sass"

export const Transfer = ({onSelectChargeAndTime}: {onSelectChargeAndTime: (charge: string, time: string) => void}) => {
  const {defaultData, selectedCard, onSelect, selectedCharge} = useHandler(onSelectChargeAndTime)

  const Card = ({time, charge, image, selected, onSelect}: ITransfer & {selected: boolean; onSelect: () => void}) => (
    <section className={`flex ${styles.transfer_time_wrapper} ${selected ? styles.selected_card : ""}`}>
      <li className={`flex-col ${styles.card} ${selected ? styles.selected_image : ""}`} onClick={onSelect}>
        <ImageView src={image} alt="" imgSize={30} />
        <h4 className={`bold ${styles.txt_wrapper} ${selected ? styles.selected_txt : ""}`}>In {time}</h4>
      </li>
      <section className={`flex-col ${styles.fees_wrapper}`}>
        <section className={`flex-sb-center ${styles.transfer_wrapper}`}>
          <h5 className={`${styles.text} ${selected ? styles.selected_text : ""}`}>Exchange rate</h5>
          <h5 className={`${styles.text} ${selected ? styles.selected_text : ""}`}>250.00 INR</h5>
        </section>
        <section className={`flex-sb-center ${styles.transfer_wrapper}`}>
          <h5 className={`${styles.text} ${selected ? styles.selected_text : ""}`}>Fees</h5>
          <h5 className={`${styles.text} ${selected ? styles.selected_text : ""}`}>{selectedCharge}</h5>
        </section>
        <section className={`flex-sb-center ${styles.transfer_wrapper}`}>
          <h5 className={`semi-bold ${styles.selected_text}`}>Total</h5>
          <h5 className={`bold ${styles.selected_txt}`}>351.00 INR</h5>
        </section>
      </section>
    </section>
  )

  return (
    <ul className={styles.container_wrapper}>
      <h4 className="bold">Select Transfer Time</h4>
      <section className={`flex-col ${styles.card_wrapper}`}>
        {defaultData.map((data, index) => (
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

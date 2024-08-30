import {ImageView} from "@fanam-pkg/core-ui-sass"
import {ITransfer} from "props"
import {useHandler} from "./handler"
import styles from "./styles.module.sass"

export const Transfer = ({onSelectChargeAndTime}: {onSelectChargeAndTime: (charge: string, time: string) => void}) => {
  const {defaultData, selectedCard, handleSelect, selectedCharge} = useHandler(onSelectChargeAndTime)

  const Card = ({time, charge, image, selected, onSelect}: ITransfer & {selected: boolean; onSelect: () => void}) => (
    <section className={`${styles.card} ${selected ? styles.selected : ""}`} onClick={onSelect}>
      <ImageView src={image} alt="" imgSize={30} />
      <h4 className={`bold ${styles.txt_wrapper}`}>{time}</h4>
      <h5>Charge {charge}</h5>
    </section>
  )

  return (
    <section>
      <section className={styles.container_wrapper}>
        <h4 className="bold">Transfer Time</h4>
        <section className={`flex ${styles.card_wrapper}`}>
          {defaultData.map((data, index) => (
            <Card
              key={index}
              {...data}
              selected={selectedCard === index}
              onSelect={() => handleSelect(data.charge, data.time, index)}
            />
          ))}
        </section>
      </section>
      <section className={`flex-sb-center ${styles.transfer_wrapper}`}>
        <h5>Transfer Fee</h5>
        <h5> {selectedCharge}</h5>
      </section>
    </section>
  )
}

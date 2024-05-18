import {ImageView} from "@fanam-pkg/core-ui-sass"
import {useState} from "react"
import assets from "assets"
import {AccordianProps} from "props"
import styles from "./styles.module.sass"

export const Accordian = ({children, title, description, leading_icon, tailing_icon, isFrequent}: AccordianProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }
  return (
    <section className={"flex-col"}>
      <section className={`flex ${styles.container}`}>
        {isFrequent && (
          <section className={`flex ${styles.tag_wrapper}`}>
            <h6>Frequently used</h6>
            <ImageView src={assets.ic_star} alt="star-icon" imgSize={10} wrapperClass={styles.star_image} />
          </section>
        )}
        {leading_icon && (
          <ImageView src={leading_icon} alt="bank-icon" imgSize={25} wrapperClass={styles.bank_image}></ImageView>
        )}
        <section className={`flex ${styles.detail_container}`}>
          <section className={`flex-col ${styles.details_wrapper}`}>
            <h3>{title}</h3>
            <h4>{description}</h4>
          </section>
          {tailing_icon && (
            <ImageView
              src={isOpen ? assets.ic_up_arrow : assets.ic_black_arrow}
              alt="bank-icon"
              imgSize={isOpen ? 32 : 25}
              wrapperClass={styles.down_arrow}
              onClick={handleToggle}></ImageView>
          )}
        </section>
      </section>
      {isOpen && <section className={`flex-col  ${isOpen ? styles.open : ""}`}>{children}</section>}
      <hr></hr>
    </section>
  )
}

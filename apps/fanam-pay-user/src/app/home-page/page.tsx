"use client"

import {DropDown, ImageView, RadioButton, TextField} from "@fanam-pkg/core-ui-sass"
import {useState} from "react"
import assets from "assets"
import {BaseContainer, Slider} from "organisms"
import CountryList from "organisms/pop-up"
import {useHandler} from "./handler"
import styles from "./page.module.sass"

const HomePage = () => {
  const [selectedCountryId, setSelectedCountryId] = useState<string | null>(null)
  const {
    onAdd,
    recipientType,
    onSelectRecipientType,
    senderType,
    onSelectSenderType,
    isSliderVisible,
    setIsSliderVisible,
    data,
    onChangeAmount,
    sourceAmount,
    destinationAmount,
  } = useHandler(selectedCountryId)

  const handleClick = (country_id: string) => {
    setSelectedCountryId(country_id)
    setIsSliderVisible(false)
  }
  return (
    <BaseContainer
      header="Cross Border Remittance"
      buttonText="Confirm"
      onClick={onAdd}
      childWrapper={styles.page_container}
      backIcon={false}>
      <section className={styles.container_wrapper}>
        <section className={`flex-col ${styles.button_container}`}>
          <h4 className="semi-bold">Sender type</h4>
          <RadioButton
            items={senderType}
            onSelectItems={onSelectSenderType}
            wrapperClass={styles.radio_button}
            radioGroupName="senderTypeGroup"
          />
        </section>
        <section className={`flex-col ${styles.button_container}`}>
          <h4 className="semi-bold"> Recipient type</h4>
          <RadioButton
            items={recipientType}
            onSelectItems={onSelectRecipientType}
            wrapperClass={styles.radio_button}
            radioGroupName="recipientTypeGroup"
          />
        </section>
        <DropDown
          options={["dfjd", "dfdj"]}
          wrapperClass={styles.drop_down_wrapper}
          label={"Purpose of Sending Money"}
        />
        <h4 className={`semi-bold ${styles.conversion_text}`}>Conversion Estimate</h4>
        <section className={styles.conversion_container}>
          <h5 className={`bold ${styles.send_text}`}>You Send</h5>
          <section className={`flex ${styles.input_container}`}>
            <section className={`flex ${styles.flag_wrapper}`}>
              <ImageView src={assets.ic_india_flag} alt="country_flag" imgSize={40} />
              <h3 className={styles.currency_text}>INR</h3>
            </section>
            <ImageView src={assets.ic_grey_arrow} alt="down-arrow" imgSize={15} />
            <TextField
              wrapperClass={styles.text_field_wrapper}
              value={sourceAmount}
              onChange={e => onChangeAmount(e.target.value)}
            />
          </section>
          <h5 className={`bold ${styles.recipient_text}`}>Recipient receives</h5>
          <section className={`flex ${styles.input_container}`}>
            <section className={`flex ${styles.flag_wrapper}`}>
              <ImageView src={assets.ic_us_flag} alt="country_flag" imgSize={40} />
              <h3 className={styles.currency_text}>{`${data?.currency || "USD"}`}</h3>
            </section>
            <ImageView
              src={assets.ic_grey_arrow}
              alt="down-arrow"
              onClick={() => setIsSliderVisible(true)}
              imgSize={15}
            />
            <TextField wrapperClass={styles.text_field_wrapper} value={destinationAmount} />
          </section>
        </section>
      </section>
      <Slider isVisible={isSliderVisible} setIsVisible={setIsSliderVisible} title="Countries">
        <CountryList onClick={handleClick} />
      </Slider>
    </BaseContainer>
  )
}

export default HomePage

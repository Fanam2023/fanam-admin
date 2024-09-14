import {useEffect, useState} from "react"
import assets from "assets"
import {ITransfer} from "props"

export const useHandler = (onSelectChargeAndTime: (charge: string, time: string) => void) => {
  const [selectedCard, setSelectedCard] = useState<number | null>(0)

  const defaultData: ITransfer[] = [
    {image: assets.ic_rocket, time: "12 Hours", charge: "1000.00 INR"},
    {image: assets.ic_parachute, time: "24 Hours", charge: "700.00 INR"},
    {image: assets.ic_delivery, time: "36 Hours", charge: "300.00 INR"},
  ]

  const onSelect = (charge: string, time: string, index: number) => {
    setSelectedCard(index)
    onSelectChargeAndTime(charge, time)
  }

  const {charge: selectedCharge = "", time: selectedTime = ""} = defaultData[selectedCard] || {}

  useEffect(() => {
    if (selectedCard !== null) {
      const {charge, time} = defaultData[selectedCard]
      onSelectChargeAndTime(charge, time)
    }
  }, [selectedCard, onSelectChargeAndTime])

  return {defaultData, selectedCard, onSelect, selectedCharge, selectedTime}
}

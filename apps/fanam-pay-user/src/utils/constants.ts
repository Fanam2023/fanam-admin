import assets from "assets"
import {IBeneficiary, IRecipients} from "model"
import {BottomNavbarProps, RecipientPreviewProps} from "props"
import {ROUTE_HISTORY, ROUTE_HOME, ROUTE_PROFILE} from "./route"

export const BOTTOM_TABS: BottomNavbarProps[] = [
  {icon: assets.ic_calendar, name: "Home", path: ROUTE_HOME},
  {icon: assets.ic_camera, name: "History", path: ROUTE_HISTORY},
  {icon: assets.ic_location, name: "Setting", path: ""},
  {icon: assets.ic_profile, name: "Profile", path: ROUTE_PROFILE},
]

export const RECIPIENTDETAILS: RecipientPreviewProps[] = [
  {label: "Name", value: "Ragul"},
  {label: "E-mail Address", value: "ragul@gmail.com"},
  {label: "Country", value: "India"},
  {label: "State", value: "Tamil Nadu"},
  {label: "City", value: "Coimbatore"},
  {label: "Zip Code", value: "641023"},
  {label: "Phone Number", value: "6383xxxx28"},
]

export const ACCOUNTDETAILS: RecipientPreviewProps[] = [
  {label: "Account Number", value: "Varshini"},
  {label: "IBAN Number", value: "varshini@gmail.com"},
  {label: "Swift Code", value: "8884121455"},
  {label: "Routing Code", value: "55574545855"},
  {label: "Recipient Address", value: "Toranto"},
  {label: "Bank Name", value: "Bank of America"},
  {label: "Branch Address", value: "Toranto"},
]

export const BENEFICIARY_LIST: IBeneficiary[] = [
  {email: "roshini@gmail.com", name: "Roshini", profileIcon: assets.ic_user},
  {email: "alex@gmail.com", name: "Alex", profileIcon: assets.ic_user},
  {email: "taylor@gmail.com", name: "Taylor", profileIcon: assets.ic_user},
]

export const RECIPIENT_LIST: IRecipients[] = [
  {accountNumber: "xxxx xxxxx x6790", name: "Rithick", profileIcon: assets.ic_user},
  {accountNumber: "yyyy yyyyy y1234", name: "Alex", profileIcon: assets.ic_user},
  {accountNumber: "zzzz zzzzz z5678", name: "Taylor", profileIcon: assets.ic_user},
]

import {assets} from "@fanam-pkg/core-ui-sass"
import {BottomNavbarProps, RecepiantAccountProps, RecepiantProps} from "props"
import {ROUTE_HISTORY, ROUTE_HOME, ROUTE_PROFILE} from "./route"

export const BOTTOM_TABS: BottomNavbarProps[] = [
  {icon: assets.ic_calendar, name: "Home", path: ROUTE_HOME},
  {icon: assets.ic_camera, name: "History", path: ROUTE_HISTORY},
  {icon: assets.ic_location, name: "Setting", path: ""},
  {icon: assets.ic_profile, name: "Profile", path: ROUTE_PROFILE},
]

export const RECIPIENTDETAILS: RecepiantProps[] = [
  {name: "Name", data: "Ragul"},
  {name: "E-mail Address", data: "ragul@gmail.com"},
  {name: "Country", data: "India"},
  {name: "State", data: "Tamil Nadu"},
  {name: "City", data: "Coimbatore"},
  {name: "Zip Code", data: "641023"},
  {name: "Phone Number", data: "6383xxxx28"},
]

export const ACCOUNTDETAILS: RecepiantAccountProps[] = [
  {name: "Account Number", data: "Varshini"},
  {name: "IBAN Number", data: "varshini@gmail.com"},
  {name: "Swift Code", data: "8884121455"},
  {name: "Routing Code", data: "55574545855"},
  {name: "Recipient Address", data: "Toranto"},
  {name: "Bank Name", data: "Bank of America"},
  {name: "Branch Address", data: "Toranto"},
]

import {assets} from "@fanam-pkg/core-ui-sass"
import {BottomNavbarProps} from "props"
import {ROUTE_HISTORY, ROUTE_HOME, ROUTE_PROFILE} from "./route"

export const BOTTOM_TABS: BottomNavbarProps[] = [
  {icon: assets.ic_calendar, name: "Home", path: ROUTE_HOME},
  {icon: assets.ic_camera, name: "History", path: ROUTE_HISTORY},
  {icon: assets.ic_location, name: "Setting", path: ""},
  {icon: assets.ic_profile, name: "Profile", path: ROUTE_PROFILE},
]

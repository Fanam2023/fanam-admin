import {ImageView} from "@fanam-pkg/core-ui-sass"
import Link from "next/link"
import {usePathname} from "next/navigation"
import {BottomNavbarProps} from "props"
import {BOTTOM_TABS} from "utils"
import styles from "./page.module.sass"

const BottomNavbar = () => {
  const pathname = usePathname()

  const renderBottomTabs = ({icon, name, path}: BottomNavbarProps, index: number) => (
    <Link href={path} key={index}>
      <ImageView className={styles.icon} src={icon} alt="" imgSize={20} />
      {path === pathname ? <h5 className={styles.options}>{name}</h5> : null}
    </Link>
  )

  return <nav className={`flex-sb-center ${styles.bottom_bar}`}>{BOTTOM_TABS.map(renderBottomTabs)}</nav>
}

export default BottomNavbar

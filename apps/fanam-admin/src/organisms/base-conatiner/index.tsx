"use client"

import {Button, ImageView} from "@fanam-pkg/core-ui-sass"
import {NAV_ITEMS} from "app/utils/constant"
import {usePathname, useRouter} from "next/navigation"
import {useEffect, useState} from "react"
import assets from "assets"
import styles from "./styles.module.scss"

export default function BaseContainer({children}) {
  const pathname = usePathname()
  const router = useRouter()
  const [openMenu, setOpenMenu] = useState(null)
  const [activeMenu, setActiveMenu] = useState("")
  const [activeSubMenu, setActiveSubMenu] = useState(null)
  const [title, setTitle] = useState("")
  const [lastSubMenuPath, setLastSubMenuPath] = useState({})

  useEffect(() => {
    const activeNav = NAV_ITEMS.find(
      item => item.subItems.some(sub => pathname.startsWith(sub.path)) || pathname.startsWith(item.path)
    )

    if (activeNav) {
      setActiveMenu(activeNav.label)

      if (activeNav.subItems.length > 0) {
        const activeSub = activeNav.subItems.find(sub => pathname.startsWith(sub.path))

        if (activeSub) {
          setActiveSubMenu(activeNav.subItems.indexOf(activeSub))
          setOpenMenu(NAV_ITEMS.indexOf(activeNav))
          setTitle(activeSub.label)
        } else {
          const closestSub = activeNav.subItems.find(sub => pathname.includes(sub.path))
          if (closestSub) {
            setActiveSubMenu(activeNav.subItems.indexOf(closestSub))
            setTitle(closestSub.label)
          } else {
            setActiveSubMenu(null)
            setTitle(activeNav.label)
          }
        }
      } else {
        setActiveSubMenu(null)
        setTitle(activeNav.label)
      }

      setOpenMenu(null)
    }
  }, [pathname])

  const toggleSubMenu = index => {
    const item = NAV_ITEMS[index]

    if (item.subItems.length === 0) {
      setActiveMenu(item.label)
      setTitle(item.label)
      router.replace(item.path)
      setOpenMenu(null)
    } else {
      if (openMenu === index) {
        setOpenMenu(null)
      } else {
        setOpenMenu(index)
        setActiveMenu(item.label)

        // Ensure last visited submenu path is restored
        const lastPath = lastSubMenuPath[item.label] || pathname // Use `pathname` to persist detail pages
        const activeSubIndex = item.subItems.findIndex(sub => sub.path === lastPath)

        if (activeSubIndex !== -1) {
          setActiveSubMenu(activeSubIndex)
          setTitle(item.subItems[activeSubIndex]?.label || item.label)
          router.replace(lastPath) // Navigate to the last visited submenu
        }
      }
    }
  }

  const handleBackButtonClick = e => {
    e.preventDefault()
    setOpenMenu(null)
  }

  const handleSubMenuItemClick = (subIndex, subPath, e) => {
    e.preventDefault()

    setActiveSubMenu(subIndex)
    setTitle(NAV_ITEMS[openMenu].subItems[subIndex].label)

    // Persist last visited submenu path for this menu
    setLastSubMenuPath(prev => ({
      ...prev,
      [NAV_ITEMS[openMenu].label]: subPath,
    }))

    router.replace(subPath)
  }

  return (
    <div className={`${styles.app_container} ${openMenu !== null ? styles.submenu_open : ""}`}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebar_header}>
          <ImageView src={assets.img_Logo} alt="App Logo" wrapperClass={styles.logo} />
        </div>
        <nav className={styles.sidebar_menu}>
          <ul>
            {NAV_ITEMS.map((item, index) => (
              <li key={index} className={styles.menu_item_container}>
                <div
                  className={`${styles.menu_item} ${activeMenu === item.label ? styles.menu_item_active : ""}`}
                  onClick={() => toggleSubMenu(index)}
                  data-selected={item.subItems.some(sub => pathname.startsWith(sub.path))}>
                  <ImageView
                    src={
                      pathname.startsWith(item.subItems[0]?.path) || openMenu === index || activeMenu === item.label
                        ? item.activeIcon.src
                        : item.icon.src
                    }
                    alt={item.label}
                    wrapperClass={styles.menu_icon}
                  />
                </div>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {openMenu !== null && (
        <aside className={styles.submenu_sidebar}>
          <div className={styles.submenu_header}>
            <span className={styles.submenu_title}>{title}</span>
            <Button wrapperClass={styles.back_button} onClick={handleBackButtonClick}>
              <ImageView src={assets.img_menu_back} alt="Back Button" wrapperClass={styles.back_icon} />
            </Button>
          </div>
          <ul className={styles.menu_list}>
            {NAV_ITEMS[openMenu]?.subItems?.map((subItem, subIndex) => (
              <li
                key={subIndex}
                className={`${styles.menu_list_item} ${pathname.startsWith(subItem.path) ? styles.submenu_active : ""}`}
                onClick={e => handleSubMenuItemClick(subIndex, subItem.path, e)}>
                <div>{subItem.label}</div>
              </li>
            ))}
          </ul>
        </aside>
      )}

      <div className={`${styles.main_content} ${openMenu !== null ? styles.main_content_minimized : ""}`}>
        <header className={`${styles.topbar} ${openMenu !== null ? styles.topbar_minimized : ""}`}>
          <div className={styles.header_font}>{title}</div>

          <div className={styles.topbar_right}>
            <ImageView src={assets.img_header_bell} alt="Notification Bell" wrapperClass={styles.icon} />
            <div className={styles.help}>
              <ImageView src={assets.img_header_help} alt="Help Icon" wrapperClass={styles.icon} />
              <span className={styles["help-text"]}>Help</span>
            </div>
            <ImageView src={assets.img_header_profile} alt="User Avatar" wrapperClass={styles.avatar} />
          </div>
        </header>
        <main className={`${styles.main_page}`}>{children}</main>
      </div>
    </div>
  )
}

"use client"

import {Button, ImageView} from "@fanam-pkg/core-ui-sass"
import {NAV_ITEMS} from "app/utils/constant"
import assets from "assets"
import {useNavigationHandler} from "./handle"
import styles from "./styles.module.scss"

export default function BaseContainer({children}: {children: React.ReactNode}) {
  const {openMenu, activeMenu, activeSubMenu, title, toggleSubMenu, handleBackButtonClick, handleSubMenuItemClick} =
    useNavigationHandler()

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
                  className={`${styles.menu_item} ${activeMenu === item.label ? styles.menu_item_active : ""} ${
                    !item.click ? styles.menu_item_disabled : "" // Add disabled style
                  }`}
                  onClick={() => item.click && toggleSubMenu(index)} // Only allow click if item.click is true
                >
                  <ImageView
                    src={openMenu === index || activeMenu === item.label ? item.activeIcon.src : item.icon.src}
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
                className={`${styles.menu_list_item} ${activeSubMenu === subIndex ? styles.submenu_active : ""} ${
                  !subItem.subClick ? styles.submenu_disabled : "" // Add a disabled style
                }`}
                onClick={e => subItem.subClick && handleSubMenuItemClick(subIndex, subItem.path, e)}>
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

"use client"

import {Button, ImageView} from "@fanam-pkg/core-ui-sass"
import {useState} from "react"
import assets from "assets"
import {NAV_ITEMS} from "utils"
import useNavigationHandler from "./handler"
import styles from "./style.module.sass"

export const BaseContainer = ({children}: {children: React.ReactNode}) => {
  const [isHovered, setIsHovered] = useState(false)
  const {openMenu, activeMenu, activeSubMenu, title, toggleSubMenu, handleBackButtonClick, handleSubMenuItemClick} =
    useNavigationHandler()

  const renderMainMenuItem = (item: any, index: number) => (
    <li key={index} className={styles.menu_item_container}>
      <section
        className={`${styles.menu_item} ${activeMenu === item.label ? styles.menu_item_active : ""} ${
          !item.click ? styles.menu_item_disabled : ""
        }`}
        onClick={() => item.click && toggleSubMenu(index)}>
        <ImageView
          src={openMenu === index || activeMenu === item.label ? item.activeIcon.src : item.icon.src}
          alt={item.label}
          wrapperClass={styles.menu_icon}
        />
      </section>
    </li>
  )

  const renderSubMenuItem = (subItem: any, subIndex: number) => (
    <li
      key={subIndex}
      className={`${styles.menu_list_item} ${activeSubMenu === subIndex ? styles.submenu_active : ""} ${
        !subItem.subClick ? styles.submenu_disabled : ""
      }`}
      onClick={e => {
        console.log("Submenu Item Clicked:", subItem.label)
        if (subItem.subClick) {
          handleSubMenuItemClick(subIndex, subItem.path, e)
        }
      }}>
      <section>{subItem.label}</section>
    </li>
  )

  return (
    <section className={`${styles.app_container} ${openMenu !== null ? styles.submenu_open : ""}`}>
      <aside className={styles.sidebar}>
        <section className={styles.sidebar_header}>
          <ImageView src={assets.img_Logo} alt="App Logo" wrapperClass={styles.logo} />
        </section>
        <nav className={styles.sidebar_menu}>
          <ul>{NAV_ITEMS.map((item, index) => renderMainMenuItem(item, index))}</ul>
        </nav>
      </aside>

      {openMenu !== null && (
        <aside className={styles.submenu_sidebar}>
          <section className={styles.submenu_header}>
            <span className={`bold ${styles.submenu_title}`}>{title}</span>
            <Button wrapperClass={styles.back_button} onClick={handleBackButtonClick}>
              <ImageView src={assets.ic_back_arrow} alt="Back Button" wrapperClass={styles.back_icon} />
            </Button>
          </section>
          <ul className={styles.menu_list}>
            {NAV_ITEMS[openMenu]?.subItems?.map((subItem, subIndex) => (
              <li
                key={subIndex}
                className={`${styles.menu_list_item} ${activeSubMenu === subIndex ? styles.submenu_active : ""} ${
                  !subItem.subClick ? styles.submenu_disabled : ""
                }`}
                onClick={e => subItem.subClick && handleSubMenuItemClick(subIndex, subItem.path, e)}>
                <section>{subItem.label}</section>
              </li>
            ))}
          </ul>
        </aside>
      )}

      <section className={`${styles.main_content} flex-col ${openMenu !== null ? styles.main_content_minimized : ""}`}>
        <header className={`${styles.topbar} ${openMenu !== null ? styles.topbar_minimized : ""}`}>
          <section className={`bold ${styles.header_font}`}>{title}</section>
          <section className={styles.topbar_right}>
            <ImageView src={assets.img_header_bell} alt="Notification Bell" wrapperClass={styles.icon} />
            <section className={styles.help}>
              <ImageView src={assets.img_header_help} alt="Help Icon" wrapperClass={styles.icon} />
              <span className={styles.help_text}>Help</span>
            </section>

            <section
              className={`flex ${styles.profileContainer}`}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}>
              <ImageView src={assets.img_header_profile} alt="User Avatar" wrapperClass={styles.profilePicture} />

              {isHovered && (
                <section className={styles.dropdown}>
                  <section className={`flex ${styles.profileDetails}`}>
                    <ImageView src={assets.img_header_profile} alt="User Avatar" wrapperClass={styles.profilePicture} />
                    <section className={`flex ${styles.profileText}`}>
                      <p className={styles.name}>John Doe</p>
                      <span className={styles.sub_name}>Admin</span>
                    </section>
                  </section>
                  <section className={`flex ${styles.logoutContainer}`}>
                    <ImageView src={assets.ic_logout} alt="logout" wrapperClass={styles.logoutIcon} />
                    <button className={styles.logout}>Logout</button>
                  </section>
                </section>
              )}
            </section>
          </section>
        </header>

        <main className={`${styles.main_page}`}>{children}</main>
      </section>
    </section>
  )
}

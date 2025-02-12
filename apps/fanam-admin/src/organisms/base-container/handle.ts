"use client"

import {usePathname, useRouter} from "next/navigation"
import {useEffect, useState} from "react"
import {NAV_ITEMS} from "utils"

const useNavigationHandler = () => {
  const pathname = usePathname()
  const {push} = useRouter()
  const [openMenu, setOpenMenu] = useState<number | null>(null)
  const [activeMenu, setActiveMenu] = useState("")
  const [activeSubMenu, setActiveSubMenu] = useState<number | null>(null)
  const [title, setTitle] = useState("")
  const [lastSubMenuPath, setLastSubMenuPath] = useState<Record<string, string>>({})

  useEffect(() => {
    const activeNav = NAV_ITEMS.find(item => item.subItems.some(sub => pathname === sub.path) || pathname === item.path)

    if (activeNav) {
      setActiveMenu(activeNav.label)

      if (activeNav.subItems.length > 0) {
        const activeSub = activeNav.subItems.find(sub => pathname === sub.path)

        if (activeSub) {
          setActiveSubMenu(activeNav.subItems.indexOf(activeSub))
          setOpenMenu(NAV_ITEMS.indexOf(activeNav))
          setTitle(activeSub.label)
        } else {
          const firstSubItem = activeNav.subItems[0]
          setActiveSubMenu(0)
          setOpenMenu(NAV_ITEMS.indexOf(activeNav))
          setTitle(firstSubItem.label)
          push(firstSubItem.path)
        }
      } else {
        setActiveSubMenu(null)
        setTitle(activeNav.label)
      }
    } else {
      setActiveMenu("")
      setActiveSubMenu(null)
      setTitle("")
      setOpenMenu(null)
    }
  }, [pathname])

  const toggleSubMenu = (index: number) => {
    const item = NAV_ITEMS[index]

    if (!item.click) return

    if (item.subItems.length === 0) {
      setActiveMenu(item.label)
      setTitle(item.label)
      push(item.path)
      setOpenMenu(null)
    } else {
      setOpenMenu(index)
      setActiveMenu(item.label)

      let activeSubIndex = item.subItems.findIndex(sub => pathname.startsWith(sub.path))

      if (activeSubIndex !== -1) {
        setActiveSubMenu(activeSubIndex)
        setTitle(item.subItems[activeSubIndex].label)
      } else {
        setActiveSubMenu(0)
        setTitle(item.subItems[0].label)
        push(item.subItems[0].path)
      }
    }
  }

  const handleBackButtonClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setOpenMenu(null)
  }

  const handleSubMenuItemClick = (subIndex: number, subPath: string, e: React.MouseEvent) => {
    e.preventDefault()

    const subItem = NAV_ITEMS[openMenu!].subItems[subIndex]

    if (!subItem.subClick) return

    setActiveSubMenu(subIndex)
    setTitle(subItem.label)

    setLastSubMenuPath(prev => ({
      ...prev,
      [NAV_ITEMS[openMenu!].label]: subPath,
    }))

    push(subPath)
  }

  return {
    openMenu,
    activeMenu,
    activeSubMenu,
    title,
    toggleSubMenu,
    handleBackButtonClick,
    handleSubMenuItemClick,
  }
}

export default useNavigationHandler

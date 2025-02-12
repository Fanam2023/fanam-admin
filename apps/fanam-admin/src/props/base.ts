export interface NavItemProps {
  label: string
  icon: any
  activeIcon: any
  path?: string
  subItems: {label: string; path: string; subClick: boolean}[]
  click: boolean
}

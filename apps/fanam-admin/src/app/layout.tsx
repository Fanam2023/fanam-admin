"use client"

import {UIProvider} from "@fanam-pkg/core-ui-sass"
import "@fanam-pkg/core-ui-sass/src/styles/style.sass"
import {Inter} from "next/font/google"
import {usePathname} from "next/navigation"
import "@custom/ui/src/styles/index.css"
import BaseContainer from "organisms/base-conatiner"
import "./layout.module.scss"

const primaryFont = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--primary-font",
})

export default function RootLayout({children}: {children: React.ReactNode}) {
  const pathname = usePathname()
  const isAuthPage = pathname.startsWith("/auth")

  return (
    <html lang="en">
      <body className={`${primaryFont.variable}`}>
        <UIProvider>{isAuthPage ? children : <BaseContainer>{children}</BaseContainer>}</UIProvider>
      </body>
    </html>
  )
}

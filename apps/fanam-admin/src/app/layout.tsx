"use client"

import {UIProvider} from "@fanam-pkg/core-ui-sass"
import "@fanam-pkg/core-ui-sass/src/styles/style.sass"
import {DM_Sans} from "next/font/google"
import {usePathname} from "next/navigation"
import {CustomProvider} from "@custom/ui"
import "@custom/ui/src/styles/index.css"
import {BaseContainer} from "organisms"
import {LibProvider} from "provider"
import "./layout.module.sass"

const primaryFont = DM_Sans({
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
        <LibProvider>
          <UIProvider>
            <CustomProvider>{isAuthPage ? children : <BaseContainer>{children}</BaseContainer>}</CustomProvider>
          </UIProvider>
        </LibProvider>
      </body>
    </html>
  )
}

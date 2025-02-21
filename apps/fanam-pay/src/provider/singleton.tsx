import {useCookies, useReactQuery, useStorage} from "@fanam-pkg/core-utils"
import {useParams, usePathname, useRouter} from "next/navigation"
import {PropsWithChildren, useEffect, useState} from "react"
import {useMutation, useQuery} from "@tanstack/react-query"
import {ITransaction, IUser, TypeSignOut} from "@custom/utils"
import {SingletonContext} from "contexts"
import {useAuthController, useHomeController, useTransactionController} from "controller"
import {IBankDetails, ISingleton} from "model"
import {
  COOKIE_ACCESS_TOKEN,
  COOKIE_BANK_NAME,
  COOKIE_REFRESH_TOKEN,
  COOKIE_TRANSACTION_ID,
  QUERY_TRANSACTION,
  QUERY_USER,
  ROUTE_HOME,
  ROUTE_SENDER,
} from "utils"

export const SingletonProvider = ({children}: PropsWithChildren) => {
  const {setCookie, getCookie, removeCookie} = useCookies()
  const {getUser, logout, logoutAllDevice} = useAuthController()
  const {getTransactionDetails} = useTransactionController()
  const {getClientId} = useHomeController()
  const {clearQueryCache} = useReactQuery()
  const {replace} = useRouter()
  const {clearAllStorage} = useStorage()
  const {transactionId} = useParams()
  const pathname = usePathname()
  const [user, setUser] = useState<IUser | null>(null)
  const [transData, setTransData] = useState<ITransaction | null>(null)
  const [token, setToken] = useState<string | null>(getCookie<string>(COOKIE_ACCESS_TOKEN))
  const [transId, setTransId] = useState<string | null>(getCookie<string>(COOKIE_TRANSACTION_ID))
  const [refreshToken, setRefreshToken] = useState<string | null>(getCookie<string>(COOKIE_REFRESH_TOKEN))
  const [bankName, setBankName] = useState<string | null>(getCookie<string>(COOKIE_BANK_NAME))
  const [bankDetails, setBankDetails] = useState<IBankDetails | null>(null)
  const {data: userRes, refetch: refetchUser} = useQuery({
    enabled: !!token && !user,
    queryKey: [QUERY_USER],
    queryFn: getUser,
  })

  const {data: transRes, refetch: refetchTransaction} = useQuery({
    enabled: !!transId && !transData,
    queryKey: [QUERY_TRANSACTION],
    queryFn: () => getTransactionDetails(transId),
  })

  const updateUserData = (user: IUser | null) => setUser(user)

  const updateTransData = (data: ITransaction | null) => setTransData(data)

  const updateTransId = (transId: string | null) => {
    if (transId) setCookie(COOKIE_TRANSACTION_ID, transId)
    else removeCookie(COOKIE_TRANSACTION_ID)
    setTransId(transId)
  }

  const resetTransaction = () => {
    updateTransData(null)
    updateTransId(null)
  }

  const updateToken = (accessToken: string) => {
    if (accessToken) setCookie(COOKIE_ACCESS_TOKEN, accessToken)
    else removeCookie(COOKIE_ACCESS_TOKEN)
    setToken(accessToken)
  }

  const updateRefreshToken = (token: string) => {
    if (token) setCookie(COOKIE_REFRESH_TOKEN, token)
    else removeCookie(COOKIE_REFRESH_TOKEN)
    setRefreshToken(token)
  }

  useEffect(() => {
    if (userRes) setUser(userRes)
  }, [userRes])

  useEffect(() => {
    if (transRes) updateTransData(transRes)
  }, [transRes])

  useEffect(() => {
    if (pathname === ROUTE_HOME || pathname === ROUTE_SENDER || transactionId || pathname.includes("auth/")) {
      resetTransaction()
    }
  }, [transactionId, pathname])

  const updateBankName = (bankName: string) => {
    if (bankName) setBankName(bankName)
  }

  const {mutate: fetchClientId} = useMutation({
    mutationKey: ["bank"],
    mutationFn: getClientId,
    onSuccess: ({result}) => {
      if (result) {
        const {index_css_file, manifest_file, logo_variations, background_color, accent_color} = result || {}
        const logo = logo_variations[2].src
        setBankDetails({
          index_css_file,
          manifest_file,
          logoVariantons: logo,
          background_color,
          accent_color,
        })
      }
    },
  })

  useEffect(() => {
    if (bankName) {
      fetchClientId(bankName)
    }

    const cssUrl = bankDetails?.index_css_file
    const linkCss = document.createElement("link")
    linkCss.rel = "stylesheet"
    linkCss.href = cssUrl
    document.head.appendChild(linkCss)
    const manifestUrl = bankDetails?.manifest_file
    const linkManifest = document.createElement("link")
    linkManifest.rel = "manifest"
    linkManifest.href = manifestUrl
    document.head.appendChild(linkManifest)
  }, [bankName, bankDetails?.index_css_file])

  const signOutUser = async (action: TypeSignOut = "logout") => {
    if (action === "logout-all") await logoutAllDevice()
    else await logout({refreshToken})

    updateToken(null)
    updateRefreshToken(null)
    updateTransData(null)
    updateUserData(null)
    updateTransId(null)
    removeCookie(COOKIE_ACCESS_TOKEN)
    removeCookie(COOKIE_REFRESH_TOKEN)
    clearQueryCache()
    clearAllStorage()
    // replace(action === "forgot-pin" ? ROUTE_FORGOT_PIN : ROUTE_LOGIN)
  }

  const value: ISingleton = {
    bankDetails,
    user,
    token,
    transId,
    transData,
    bankName,
    updateBankName,
    updateUserData,
    signOutUser,
    updateToken,
    updateTransId,
    updateTransData,
    refreshToken,
    updateRefreshToken,
    refetchUser,
    refetchTransaction,
    resetTransaction,
  }

  return <SingletonContext.Provider value={value}>{children}</SingletonContext.Provider>
}

import {useCookies, useReactQuery, useStorage} from "@fanam-pkg/core-utils"
import {useParams, usePathname, useRouter} from "next/navigation"
import {PropsWithChildren, useEffect, useState} from "react"
import {useQuery} from "@tanstack/react-query"
import {ILogOutPayload, ITransaction, IUser} from "@custom/utils"
import {SingletonContext} from "contexts"
import {useAuthController, useTransactionController} from "controller"
import {ISingleton} from "model"
import {
  COOKIE_ACCESS_TOKEN,
  COOKIE_REFRESH_TOKEN,
  COOKIE_TRANSACTION_ID,
  QUERY_TRANSACTION,
  QUERY_USER,
  ROUTE_HOME,
  ROUTE_LOGIN,
  ROUTE_SENDER,
} from "utils"

export const SingletonProvider = ({children}: PropsWithChildren) => {
  const {setCookie, getCookie, removeCookie} = useCookies()
  const {getUser, logout} = useAuthController()
  const {getTransactionDetails} = useTransactionController()
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
      console.log(">>>>>>>>>>>>: ", pathname)

      resetTransaction()
    }
  }, [transactionId, pathname])

  const singOutUser = async () => {
    let payload: ILogOutPayload = {refreshToken}
    await logout(payload)
    removeCookie(COOKIE_ACCESS_TOKEN)
    removeCookie(COOKIE_REFRESH_TOKEN)
    updateToken(null)
    updateRefreshToken(null)
    updateTransData(null)
    updateUserData(null)
    updateTransId(null)
    clearQueryCache()
    clearAllStorage()
    replace(ROUTE_LOGIN)
  }

  const value: ISingleton = {
    user,
    token,
    transId,
    transData,
    updateUserData,
    singOutUser,
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

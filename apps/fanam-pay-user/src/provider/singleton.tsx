import {useCookies, useReactQuery, useStorage} from "@fanam-pkg/core-utils"
import {PropsWithChildren, useEffect, useState} from "react"
import {useQuery} from "@tanstack/react-query"
import {ILogOutPayload, ITransaction, IUser} from "@custom/utils"
import {SingletonContext} from "contexts"
import {useAuthController} from "controller"
import {ISingleton} from "model"
import {COOKIE_ACCESS_TOKEN, COOKIE_FCM, COOKIE_REFRESH_TOKEN, COOKIE_TRANSACTION_ID, QUERY_USER} from "utils"

export const SingletonProvider = ({children}: PropsWithChildren) => {
  const {setCookie, getCookie, removeCookie} = useCookies()
  const {getUser, logout} = useAuthController()
  // const {decodeJwtToken} = useJWT()
  const {clearQueryCache} = useReactQuery()
  const {clearAllStorage} = useStorage()
  const [user, setUser] = useState<IUser | null>(null)
  const [transData, setTransData] = useState<ITransaction | null>(null)
  const [token, setToken] = useState<string | null>(getCookie<string>(COOKIE_ACCESS_TOKEN))
  const [transId, setTransId] = useState<string | null>(getCookie<string>(COOKIE_TRANSACTION_ID))
  const [refreshToken, setRefreshToken] = useState<string | null>(getCookie<string>(COOKIE_REFRESH_TOKEN))
  const {data: userRes} = useQuery({enabled: !!token && !user, queryKey: [QUERY_USER], queryFn: getUser})
  // const {data: transRes} = useQuery({enabled: !!transId && !transData, queryKey: [QUERY_TRANSACTION], queryFn: getTransaction})

  const updateUserData = (user: IUser) => setUser(user)

  const updateTransData = (data: ITransaction) => setTransData(data)

  const updateTransId = (transId: string) => {
    setCookie(COOKIE_TRANSACTION_ID, transId)
    setTransId(transId)
  }

  const updateToken = (accessToken: string) => {
    setCookie(COOKIE_ACCESS_TOKEN, accessToken)
    setToken(accessToken)
  }

  const updateRefreshToken = (token: string) => {
    setCookie(COOKIE_REFRESH_TOKEN, token)
    setRefreshToken(token)
  }

  useEffect(() => {
    if (userRes) setUser(userRes)
  }, [userRes])

  // useEffect(() => {
  //   if (transRes) updateTransData(transRes)
  // }, [transRes])

  const singOutUser = async () => {
    const fcmToken = getCookie(COOKIE_FCM)
    let payload: ILogOutPayload = {refresh_token: refreshToken, device: "WEB"}
    if (fcmToken) payload = {...payload, token: fcmToken}
    await logout(payload)

    removeCookie(COOKIE_ACCESS_TOKEN)
    removeCookie(COOKIE_FCM)
    setToken(null)
    setUser(null)
    setRefreshToken(null)
    clearQueryCache()
    clearAllStorage()
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
  }

  return <SingletonContext.Provider value={value}>{children}</SingletonContext.Provider>
}

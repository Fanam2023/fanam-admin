import {useCookies, useReactQuery, useStorage} from "@fanam-pkg/core-utils"
import {useRouter} from "next/navigation"
import {PropsWithChildren, useEffect, useState} from "react"
import {useQuery} from "@tanstack/react-query"
import {SingletonContext} from "contexts"
import {useAuthController} from "controller"
import {ISingleton, IUser} from "model"
import {COOKIE_ACCESS_TOKEN, COOKIE_REFRESH_TOKEN, QUERY_USER, ROUTE_LOGIN} from "utils"

export const SingletonProvider = ({children}: PropsWithChildren) => {
  const {setCookie, getCookie, removeCookie} = useCookies()
  const {clearQueryCache} = useReactQuery()
  const {getUser, logout} = useAuthController()
  const {replace} = useRouter()
  const {clearAllStorage} = useStorage()
  const [user, setUser] = useState<IUser | null>(null)
  const [token, setToken] = useState<string | null>(getCookie<string>(COOKIE_ACCESS_TOKEN))
  const [refreshToken, setRefreshToken] = useState<string | null>(getCookie<string>(COOKIE_REFRESH_TOKEN))

  const updateUserData = (user: IUser | null) => setUser(user)

  const {data: userRes, refetch: refetchMyUser} = useQuery({
    enabled: !!token && !user,
    queryKey: [QUERY_USER],
    queryFn: getUser,
  })

  const updateToken = (access_token: string) => {
    if (access_token) setCookie(COOKIE_ACCESS_TOKEN, access_token)
    else removeCookie(COOKIE_ACCESS_TOKEN)
    setToken(access_token)
  }

  const updateRefreshToken = (token: string) => {
    if (token) setCookie(COOKIE_REFRESH_TOKEN, token)
    else removeCookie(COOKIE_REFRESH_TOKEN)
    setRefreshToken(token)
  }

  useEffect(() => {
    if (userRes) setUser(userRes?.result)
  }, [userRes])

  const signOutUser = async () => {
    await logout({refreshToken})

    updateToken(null)
    updateRefreshToken(null)
    updateUserData(null)
    removeCookie(COOKIE_ACCESS_TOKEN)
    removeCookie(COOKIE_REFRESH_TOKEN)
    clearQueryCache()
    clearAllStorage()
    replace(ROUTE_LOGIN)
  }

  const value: ISingleton = {
    user,
    token,
    signOutUser,
    updateToken,
    refreshToken,
    updateRefreshToken,
    refetchMyUser,
  }

  return <SingletonContext.Provider value={value}>{children}</SingletonContext.Provider>
}

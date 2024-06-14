import {useEffect} from "react"
import {useAuthController} from "controller"

export const useHandler = () => {
  const {login} = useAuthController()

  useEffect(() => {
    login().then(response => console.log(">>>>>>>>>>>>>>>>>: ", response))
  }, [])

  return {}
}

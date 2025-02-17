import {useNotifyPopup} from "@fanam-pkg/core-ui-sass"
import {useRouter} from "next/navigation"
import {useEffect, useState} from "react"
import {useMutation} from "@tanstack/react-query"
import {JSONObject} from "@custom/utils"
import {useAuthController} from "controller"
import {useSingleton} from "hooks"
import {IPayloadLogin} from "model"
import {QUERY_LOGIN, ROUTE_BANK} from "utils"

const DEFAULT_ERR_STATE = {
  isClicked: false,
  isValid: false,
  errEmail: "",
  errPassword: "",
}

export const useLoginHandler = () => {
  const {push} = useRouter()
  const {login} = useAuthController()
  const {updateToken, updateRefreshToken} = useSingleton()
  const {toggleNotify} = useNotifyPopup()

  const [data, setData] = useState<IPayloadLogin>({
    email: "",
    password: "",
  })

  const [errData, setErrData] = useState(DEFAULT_ERR_STATE)

  const {email, password} = data

  const {mutate: onlogin} = useMutation({
    mutationKey: [QUERY_LOGIN],
    mutationFn: login,
    onSuccess: ({result, errorData}) => {
      if (result) {
        const {access_token, refresh_token} = result
        updateToken(access_token)
        updateRefreshToken(refresh_token)
        toggleNotify({
          type: "success",
          title: "Login",
          description: "Login successfully",
        })
        push(ROUTE_BANK)
      } else {
        toggleNotify({
          type: "error",
          title: "Login Unsuccessful",
          description: errorData?.message || "Something went wrong",
        })
      }
    },
  })

  const onValidate = () => {
    let errData = {...DEFAULT_ERR_STATE, isValid: true, isClicked: true}

    if (!email) errData = {...errData, errEmail: "Please enter Email", isValid: false}
    if (!password) errData = {...errData, errPassword: "Please enter Password", isValid: false}

    setErrData(errData)
    return errData
  }

  useEffect(() => {
    if (errData.isClicked) {
      onValidate()
    }
  }, [data])

  const onChangeData = (value: JSONObject) => setData(prev => ({...prev, ...value}))

  const onSubmit = async () => {
    const {isValid} = onValidate()

    if (isValid) {
      onlogin(data)
    }
  }

  const onLoginSubmit = e => {
    e.preventDefault()
    onSubmit()
  }
  return {
    data,
    errData,
    onChangeData,
    onLoginSubmit,
  }
}

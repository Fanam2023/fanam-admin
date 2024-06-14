import {useContext} from "react"
import {SingletonContext} from "contexts"

export const useSingleton = () => useContext(SingletonContext)

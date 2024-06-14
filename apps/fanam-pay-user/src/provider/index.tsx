import {PropsWithChildren} from "react"
import {SingletonProvider} from "./singleton"

export const LibProvider = ({children}: PropsWithChildren) => {
  return <SingletonProvider>{children}</SingletonProvider>
}

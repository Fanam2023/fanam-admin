import {useReactQuery} from "@fanam-pkg/core-utils"
import {PropsWithChildren} from "react"
import {QueryClientProvider} from "@tanstack/react-query"
import {SingletonProvider} from "./singleton"

export const LibProvider = ({children}: PropsWithChildren) => {
  const {queryClient} = useReactQuery()
  return (
    <QueryClientProvider client={queryClient}>
      <SingletonProvider>{children}</SingletonProvider>
    </QueryClientProvider>
  )
}

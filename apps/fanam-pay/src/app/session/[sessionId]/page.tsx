"use client"

import {useParams} from "next/navigation"
import useHandler from "./handler"

const Session = () => {
  const params = useParams()
  const sessionId = params.sessionId as string

  const {data} = useHandler(sessionId)

  return <section> Loading....</section>
}

export default Session

"use client"

import {useParams} from "next/navigation"
import useHandler from "./handler"

const Session = () => {
  const params = useParams()
  const sessionId = params.sessionId as string

  const {} = useHandler(sessionId)
  return (
    <section>
      <section> Loading....</section>
    </section>
  )
}

export default Session

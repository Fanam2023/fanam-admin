"use client"

import {useQuery} from "@tanstack/react-query"
import {useHomeController} from "controller"
import {useCommon} from "hooks"
import {QUERY_POPULAR_CORRIDORS} from "utils"

export const useHandler = () => {
  const {popularCorridors} = useHomeController()
  const {getFlagUrl} = useCommon()

  const {data: getPopularCorridors, isLoading} = useQuery({
    queryKey: [QUERY_POPULAR_CORRIDORS],
    queryFn: popularCorridors,
  })

  return {
    getPopularCorridors,
    isLoading,
    getFlagUrl,
  }
}

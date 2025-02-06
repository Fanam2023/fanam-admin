"use client"

import {useTranslation} from "react-i18next"
import {useQuery} from "@tanstack/react-query"
import {useHomeController} from "controller"
import {QUERY_POPULAR_CORRIDORS} from "utils"

export const useHandler = () => {
  const {popularCorridors} = useHomeController()
  const {t} = useTranslation()

  const {data: getPopularCorridors, isLoading} = useQuery({
    queryKey: [QUERY_POPULAR_CORRIDORS],
    queryFn: popularCorridors,
  })

  const responsive = {
    desktop: {
      breakpoint: {max: 3000, min: 1024},
      items: 4,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: {max: 1024, min: 464},
      items: 3,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: {max: 464, min: 0},
      items: 2,
      slidesToSlide: 1,
    },
  }

  return {
    getPopularCorridors,
    isLoading,
    responsive,
    t,
  }
}

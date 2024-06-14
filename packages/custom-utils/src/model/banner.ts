import {IFile, IAttachment, IFormData} from "./common"

export interface IBanner {
  id?: string
  images?: string
  name: string
  startDate: string
  endDate: string
}

export interface IBannerResponse extends IBanner {
  image: IAttachment | null
}

export interface IBannerPayload extends IBanner {
  brandId: IFormData
  image: IFile | null
}

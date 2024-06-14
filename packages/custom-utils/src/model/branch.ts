import {IAddress} from "./brand"

export type BranchStatus = "Pending" | "Rejected" | "Approved" | "EditPending"

export interface IBranchBase {
  id?: string
  status?: BranchStatus
  rejectReason?: string
}

export interface IBranchResponse extends IBranchBase {
  name: string
  area?: string
}

export interface IBranchDetail extends IBranchResponse {
  doorAndFloorNo: string
  streetName: string
  city: string
  state: string
  country?: string
  lat?: string
  lng?: string
  pinCode: string
}

export interface IBranchList extends IBranchBase {
  brandName: string
  address: IAddress
}

export interface IBranchPayload extends IBranchResponse {
  brandId?: string
  lat?: string
  lng?: string
  address: IBranchDetail
}

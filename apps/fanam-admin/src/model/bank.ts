export interface IBank {
  client_id?: string
  bank_name: string
  email: string
  mobile: string
  contact_person_name: string
  designation: string
  alternative_mobile: string
}

export interface IPayloadBank extends IBank {}

export interface IBank {
  client_id: string
  bank_name: string
  email: string
  mobile: string
  contact_person_name: string
  alternative: string
  designation: string
}

export interface IPayloadBank extends IBank {}

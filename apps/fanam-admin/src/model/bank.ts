export interface IBank {
  client_id?: string
  bank_name: string
  email: string
  mobile: string
  contact_person_name: string
  designation: string
  onboard_client_id?: string
}

export interface IPayloadBank extends IBank {}

export interface IBankDetail extends IBank {
  alternative_mobile: string
  auth_method: string
  accent_color: string
  font_name: string
  font_url: string
  primary_color: string
  secondary_color: string
  background_color: string
  logo: string
  background_image: string
  onboard_client_id: string
  onboard_client_secret: string
  authorization_url: string
  sso_url: string
}

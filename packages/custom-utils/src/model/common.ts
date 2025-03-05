export interface IStyle {
  readonly [key: string]: string
}

export interface IAttachment {
  attachment_id: string
  url: string
}

export interface IAttachments extends IAttachment {
  file_name: string
  mime: string
}

export const REG_EMAIL = /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,4}$/g // eslint-disable-line
export const REG_VALID_NAME = /^[a-zA-Z0-9 ]+$/g
export const REG_INDIAN_MOBILE = /^[6789]\d{9}$/
export const REG_VALID_TEXT = /[^a-zA-Z 0-9 -]/g
export const REG_VALID_NUMBER = /^\d+$/
export const REG_REMOVE_EXTENSION = /\.[^/.]+$/
export const REG_YOUTUBE_URL = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/
export const REG_VALID_IMAGE =
  /(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg|avif))|^data:image\/(?:gif|png|jpeg|bmp|webp|avif|svg\+xml)(?:;charset=utf-8)?;base64,(?:[A-Za-z0-9]|[+/])+={0,2}/
export const REG_VALID_VIDEO =
  /(http)?s?:?(\/\/[^"']*\.(?:mp4|avi|mkv|mov))|^data:image\/(?:mp4|avi|mkv|mov)(?:;charset=utf-8)?;base64,(?:[A-Za-z0-9]|[+/])+={0,2}/
export const REG_VALID_DOCUMENT =
  /(http)?s?:?(\/\/[^"']*\.(?:pdf|docx|xlsx|pptx|doc|xls|ppt))|^data:image\/(?:pdf|docx|xlsx|pptx|doc|xls|ppt)(?:;charset=utf-8)?;base64,(?:[A-Za-z0-9]|[+/])+={0,2}/
export const REG_VALID_WEBSITE = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+(\.[a-zA-Z]{2,})?$/
export const deviceSize = {
  mobile: 768,
  // tablet: "950px",
  // laptop: "1440px",
  // desktop: "2560px",
}
export const DF_FULL_DATE = "DD MMMM YYYY"
export const DF_COMMON_DATE = "DD-MM-YYYY"
export const DF_INPUT_DATE = "YYYY-MM-DD"
export const DATE_PICKER_FORMAT = "dd-MM-yyyy"

export const API_HEADER_FORM_DATA = {
  "Content-Type": "multipart/form-data",
}

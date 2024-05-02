import {BranchStatus} from "../model"

export const API_BANNERS = "/banners"
export const API_REFRESH_TOKEN = "/auth/refresh/token"
export const API_ADMIN = "/admin"
export const API_USERS = "/user"
export const API_USER_FCM = `${API_USERS}/fcm`
export const API_AUTH = `/auth`
export const API_LOGIN = "/login"
export const API_USER_LOGIN = `${API_AUTH}${API_LOGIN}/users/v1`
export const API_BRAND_LOGIN = `${API_AUTH}${API_LOGIN}/brand/v1`
export const API_ADMIN_LOGIN = `${API_AUTH}${API_LOGIN}/admin/v1`
export const API_SUBSCRIPTION = `/subscription`
export const API_COUPONS = `/coupons`
export const apiCreateCouponByBrandId = (brandId: string) => `/admin/brands/${brandId}/coupon`
export const apiCouponImageUpload = (couponId: string) => `/coupons/files/${couponId}`
export const apiBrandFileUpload = (brandId: string) => `/brand/files/${brandId}`
export const apiBannerImageUpload = (bannerId: string) => `/banners/files/${bannerId}`
export const apiRemoveFile = (fileId: string) => `base/media/${fileId}`
export const API_ORDER = `/order`
export const API_GET_COUPONS = `/admin/coupons`
export const API_BRAND = "/brand"
export const API_ADMIN_USER = "/user"
export const API_BRANCH = "/branch"
export const API_SYNC_USER = `${API_USERS}/sync`
export const API_UPDATE_USER = `${API_USERS}/updateProfile`
export const API_USER_IMAGE = `${API_USERS}/files`
export const API_USER = `${API_ADMIN_USER}/myUser`
export const API_USER_BRAND = `${API_BRAND}/me`
export const API_ADMIN_BRAND = `${API_ADMIN}${API_BRAND}`
export const API_LOGOUT = `${API_AUTH}/logOut`
export const API_CATEGORY = `/categories`
export const API_USER_DELETE_REQUEST = `/delete-user`
export const API_ENQUIRIES = "/enquiries"
export const apiEnquiryByStatus = (brandId: string, status: string = "") =>
  `${API_ENQUIRIES}?brandId=${brandId}&status=${status}`
export const apiEnquiriesById = (queriesId: string) => `${API_ENQUIRIES}/${queriesId}`
export const apiUpdateDeleteRequest = (userId: string) => `${API_USER_DELETE_REQUEST}/${userId}`
export const API_ADD_SUBSCRIPTION = `${API_ADMIN}${API_BRAND}${API_SUBSCRIPTION}`
export const API_DASHBOARD = `${API_ADMIN}/dashboard`
export const apiBannerById = (bannerId: string) => `banners/${bannerId}`
export const apiCouponById = (couponId: string) => `coupons/${couponId}`
export const API_DOWNLOAD_COUPONS = `${API_COUPONS}/brand/couponDownloaded`
export const apiAdminAttachmentUpdate = (brandId: string) => `${API_ADMIN}/brand-attachments/${brandId}`
export const apiBranchesByBrand = (brandId: string) => `branch/brand/${brandId}`
export const apiBranchesByStatus = (status: string) => `${API_ADMIN}/branches?status=${status}`
export const apiBranchesByBrandStatus = (brandId: string, status?: BranchStatus) =>
  `branch/brand/${brandId}?status=${status || ""}`
export const apiBlockUser = (userId: string) => `user/access/${userId}`
export const apiSubscriptionById = (subscriptionId: string) => `${API_SUBSCRIPTION}/${subscriptionId}`
export const apiBranchDetail = (branchId: string) => `${API_BRANCH}/${branchId}`
export const apiCoupons = (brandId: string) => `${API_COUPONS}${API_BRAND}/${brandId}`
export const apiCouponsByBrand = (brandId: string) => `${API_COUPONS}${API_BRAND}/${brandId}`
export const apiCouponsByBrandStatus = (brandId: string, status: string) =>
  `${API_COUPONS}${API_BRAND}/${brandId}?status=${status}`
export const apiCouponApproval = (couponId: string) => `${API_ADMIN}/coupon/approval/${couponId}`
export const apiCouponByStatus = (status: string = "") => `${API_GET_COUPONS}?status=${status}`
export const API_PAUSED_COUPON = `${API_GET_COUPONS}`
export const apiBranchApproval = (branchId: string) => `${API_ADMIN}${API_BRANCH}/approval/${branchId}`
export const apiBrandApproval = (brandId: string) => `${API_ADMIN}/brand/approval/${brandId}`
export const apiBrandById = (brandId: string) => `${API_BRAND}/${brandId}`
export const apiBrands = (status: string = "") => `${API_BRAND}?status=${status}`
export const API_PREMIUM_BRAND_BANNER = `${API_ADMIN}/premium/brands/Banner`
export const API_PREMIUM_BRAND_COUPON = `${API_ADMIN}/premium/brands/Coupon`
export const apiEditBrand = (brandId: string) => `${API_ADMIN}${API_BRAND}/change-request/${brandId}`
export const apiBrandOnUpdate = (id: string) => `${API_BRAND}/profileUpdate/${id}`
export const API_BRANDS = "/user/brands"
export const apiBrandDetail = (brandId: string) => `${API_BRANDS}/${brandId}`
export const API_USER_COUPONS = "/user/coupons"
export const apiBrandCoupons = (brandId: string, cursorId: string = "", branchName: string = "") =>
  `${API_USER_COUPONS}/${brandId}?cursorId=${cursorId}&filter=${branchName}`
export const API_MY_WISHLIST = "/wishlist"
export const API_MY_COUPONS = "/user-coupon"
export const apiMyCoupons = (cursorId: string, status: string) =>
  `${API_MY_COUPONS}?cursorId=${cursorId}&status=${status}`
export const apiCouponBillUpdate = (couponId: string) => `${API_MY_COUPONS}/${couponId}`
export const apiCouponBillAttachment = (couponId: string) => `${API_MY_COUPONS}/files/${couponId}`
export const API_COUPON_DETAIL = "/user/couponById"
export const apiCouponDetail = (couponId: string) => `${API_COUPON_DETAIL}/${couponId}`
export const apiUpdateBrand = (brandId: string) => `/brand/profileUpdate/${brandId}`
export const apiCreateBanner = (brandId: string) => `${API_BANNERS}/${brandId}`
export const API_HOMEPAGE = "/home"
export const apiCategories = (latitude: number, longitude: number) => `${API_HOMEPAGE}?lat=${latitude}&lng=${longitude}`
export const apiTrendingCoupon = (latitude: number, longitude: number) =>
  `${API_HOMEPAGE}/trendingCoupons?lat=${latitude}&lng=${longitude}`
export const BRAND_DASHBOARD = `${API_BRAND}/dashboard`
export const apiBrandCategory = (categoryId: string, latitude: number, longitude: number) =>
  `/brand/category/${categoryId}?lat=${latitude}&lng=${longitude}`
export const apiSimilarCoupons = (id: string) => `/user/similarCoupons/${id}`
export const API_DELETE_USER = "/delete-user"
export const API_NEWSLETTER = "/newsletters"
export const API_NEWSLETTER_USER = `${API_NEWSLETTER}/users`
export const API_NEWSLETTER_SUBSCRIPTION = `${API_NEWSLETTER}/subscribe`
export const apiSearch = (result: string, lat: number, long: number) =>
  `user/suggest?search=${result}&lat=${lat}&lng=${long}`
export const apiGetCoupons = (categoryId: string, lat: number, long: number) =>
  `/user/couponsByCategory/${categoryId}?lat=${lat}&lng=${long}`
export const apiEnquiries = (status?: string) => `${API_ENQUIRIES}?status=${status}`
export const apiAllCoupons = (latitude: number, longitude: number, categories: string) =>
  `user/allCoupons?lat=${latitude}&lng=${longitude}&filter=${categories}`
export const apiUpgradePlanById = (brandId: string) => `/brand-subscriptions/${brandId}`

import {API_BENEFICIARY, IBeneficiary, apiBeneficiary} from "@custom/utils"
import {useApi} from "./api"

export const useBeneficiaryController = () => {
  const {getRequest, postRequest, putRequest} = useApi()

  const getAllBeneficiary = async () => {
    const {result} = await getRequest<IBeneficiary[]>(API_BENEFICIARY)
    return result || []
  }

  const createBeneficiary = async (payload: IBeneficiary) => {
    const {result, errorData} = await postRequest<IBeneficiary>(API_BENEFICIARY, payload)
    return {result, errorData}
  }

  const updateBeneficiary = async (payload: IBeneficiary) => {
    const beneficiaryId = payload.beneficiary_id
    const {result, errorData} = await putRequest(apiBeneficiary(beneficiaryId), payload)
    return {result, errorData}
  }

  const getByBeneficiaryId = async (beneficiary_id: string) => {
    const {result} = await getRequest(apiBeneficiary(beneficiary_id))
    return result
  }

  return {
    getAllBeneficiary,
    createBeneficiary,
    updateBeneficiary,
    getByBeneficiaryId,
  }
}

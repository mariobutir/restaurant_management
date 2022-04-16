import ApiAdapter, { NAMESPACES } from "./ApiAdapter"

const getVendors = async () => {
  const { data } = await ApiAdapter.get(`${NAMESPACES.VENDORS}/`)
  return data
}

const retrieveVendor = async (id) => {
  const { data } = await ApiAdapter.get(`${NAMESPACES.VENDORS}/${id}/`)
  return data
}

const createVendor = async (data) => {
  await ApiAdapter.post(`${NAMESPACES.VENDORS}/`, data)
}

const updateVendor = async (id, data) => {
  await ApiAdapter.put(`${NAMESPACES.VENDORS}/${id}/`, data)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getVendors, retrieveVendor, createVendor, updateVendor }

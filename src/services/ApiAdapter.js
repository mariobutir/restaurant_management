import axios from "axios"

const API_NAMESPACE = "/api"

export const NAMESPACES = {
  VENDORS: `${API_NAMESPACE}/vendors`,
}

class ApiAdapter {
  constructor() {
    this.instance = axios.create({
      baseURL: "http://localhost:8000",
      timeout: 10000,
    })
  }

  errorHandler = (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log("TYPE 1")
      console.log(error.response.data)
      console.log(error.response.status)

      if (error.response.status === 401) {
        //code: token_not_valid
        // this.removeToken()
        // TODO: repeat request with new token
        console.log("API ADAPTER got status 401", error)
      }
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log("TYPE 2")
      console.log(error.request)
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("TYPE 3")
      console.log("Error", error.message)
    }

    let status = error?.response?.status || 0
    const isError = true

    if (status === 401) {
      // this.removeToken()
      console.log("API ADAPTER got status 401", error)
    }

    return { status, isError }
  }

  get = async (url) => {
    return this.instance.get(url).catch((e) => this.errorHandler(e))
  }

  post = async (url, data) => {
    return this.instance.post(url, data).catch((e) => this.errorHandler(e))
  }

  put = async (url, data) => {
    return this.instance.put(url, data).catch((e) => this.errorHandler(e))
  }

  delete = async (url) => {
    return this.instance.delete(url).catch((e) => this.errorHandler(e))
  }
}

export default new ApiAdapter()

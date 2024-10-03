import axios from "axios"

const api = axios.create({
    baseURL: "https://back-alpha-amber.vercel.app"
  });

export default api
  
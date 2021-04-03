import axios from "axios";

// Pode ser algum servidor executando localmente: 
// http://localhost:3000
const url_api = process.env.NEXT_PUBLIC_API_HOST

const api = axios.create({
  baseURL: `${url_api}`,
});

export default api;
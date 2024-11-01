import axios from "axios";
import { getBaseUrl } from "./constants";
const instance = axios.create({
    baseURL: getBaseUrl(),
})
export default instance;
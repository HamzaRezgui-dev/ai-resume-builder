import { Resume } from "@/types/resume";
import axios from "axios";

const API_KEY = import.meta.env.VITE_STRAPI_API_KEY;
const axiosClient = axios.create({
  baseURL: "http://localhost:1338/api/",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
});

const createNewResume = (data: Resume) =>
  axiosClient.post("/user-resumes", { data });

export default createNewResume;

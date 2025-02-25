import { ApiResponse, Pagination, Resume } from "@/types/resume";
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

const getUserResumes = async (
  userEmail: string
): Promise<{ resumes: Resume[]; pagination: Pagination }> => {
  const response = await axiosClient.get<ApiResponse>(
    `/user-resumes?filters[userEmail][$eq]=${userEmail}`
  );

  return {
    resumes: response.data.data,
    pagination: response.data.meta.pagination,
  };
};

export default { createNewResume, getUserResumes };

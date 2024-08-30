import axios from "axios";

// const BASE_URL = "http://localhost:5000";
const BASE_URL =
  "https://attendance-3t3n7aw73-vanamuthu-vs-projects.vercel.app/";

export default axios.create({
  baseURL: BASE_URL,
});
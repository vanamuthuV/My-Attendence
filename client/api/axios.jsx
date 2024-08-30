import axios from "axios";

// const BASE_URL = "http://localhost:5000";
const BASE_URL =
  "https://attendance-git-main-vanamuthu-vs-projects.vercel.app/";

export default axios.create({
  baseURL: BASE_URL,
});
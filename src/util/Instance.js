import axios from "axios";
const Instance = axios.create({
  baseURL: "http://62.171.182.107:200",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("GPC_Agent_token"),
  },
});
export default Instance;

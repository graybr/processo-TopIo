import axios from "axios";
const backApp = axios.create({
  baseURL: "https://parseapi.back4app.com",
});
export { backApp };

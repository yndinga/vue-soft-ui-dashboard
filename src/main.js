import { createApp } from "vue"
import App from "./App.vue"
import store from "./store"
import router from "./router"
import axios from "axios";
import "./assets/css/nucleo-icons.css";
import "./assets/css/nucleo-svg.css";
import SoftUIDashboard from "./soft-ui-dashboard";

axios.defaults.baseURL = "http://agscc.test/";
axios.defaults.headers["Authorization"] = `Bearer ${localStorage.getItem(
    "token"
  )}`;
axios.defaults.withCredentials = true


const appInstance = createApp(App);

appInstance.use(store);
appInstance.use(router);
appInstance.use(SoftUIDashboard);
appInstance.mount("#app");
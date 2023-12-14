import { createApp } from "vue";
import { createHead } from "@unhead/vue";
import axios from "axios";

import App from "./App.vue";
import "./index.css";

const app = createApp(App);

const head = createHead();
app.use(head);

app.config.globalProperties.$axios = axios;

app.mount("#app");

import { createApp } from "vue"; 
import App from "./App.vue";
import router from "./router";
import store from "./store"; 
import { FontAwesomeIcon } from './plugins/font-awesome' 
import ElementPlus from 'element-plus';
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import 'element-plus/lib/theme-chalk/index.css'; 
import './assets/site.css'; 
import { Search } from '@element-plus/icons'  
import './utils/prototypes/DateToShortFormat' 
 
require('dotenv').config();

import mitt from 'mitt';
export const emitter = mitt();
 
createApp(App)
  .use(router)
  .use(store)
  .use(ElementPlus)
  .component("font-awesome-icon", FontAwesomeIcon)
  .component("search", Search)
  .mount("#app");
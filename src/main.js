import  router from './router'
import store from "./store";
import { createApp } from 'vue'
import App from './App.vue'
import "bootstrap";
import i18n from "@/core/plugins/i18n";
import db from './firebase';
import ElementPlus from "element-plus";
import "@/core/plugins/keenthemes";
import "@/core/plugins/prismjs";
import VueSweetalert2 from 'vue-sweetalert2';
import VueTimepicker from 'vue3-timepicker'
import 'vue3-timepicker/dist/VueTimepicker.css'
import jQuery from 'jquery'
import 'font-awesome/css/font-awesome.css';


//AIzaSyCU0Pbsex6N4UZ-iAQ01s2OFvyFHWF6U24

const app = createApp(App)
app.use(router)
app.use(store)
app.use(i18n)
app.use(VueSweetalert2)
app.use(VueTimepicker)
app.use(db)
app.use(ElementPlus);


app.mount('#app')

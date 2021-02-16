import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// import VueTelInputVuetify from "vue-tel-input-vuetify";
import vuetify from "./plugins/vuetify";
// import OtpInput from "@bachdgvn/vue-otp-input";
// import vueJoiValidation from 'vue-joi-validation'
// import VueAnalytics from 'vue-analytics'

// Vue.use(VueAnalytics, {
//   id: 'G-8EKD4638X0'
// })
// Vue.component("v-otp-input", OtpInput);
// Vue.use(vueJoiValidation , {})
// Vue.use(VueTelInputVuetify, {
//   vuetify,
// });

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");

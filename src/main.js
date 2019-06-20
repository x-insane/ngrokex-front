import Vue from 'vue'
import VueRouter from 'vue-router';
import router from './router';
import App from "./App";
import iView from 'iview';
import 'iview/dist/styles/iview.css';

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(iView);

new Vue({
    router: new VueRouter({ routes: router }),
    render: h => h(App),
}).$mount('#app');

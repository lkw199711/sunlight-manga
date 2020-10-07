import Vue from "vue";
import App from "./index.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

import 'reset-css';

// 引入ui组件
import Vant, {Toast} from 'vant';
import ElementUI from 'element-ui';
import Antd from 'ant-design-vue';

// 引入组件css
import 'vant/lib/index.css';
import 'vant/lib/icon/local.css';
import 'element-ui/lib/theme-chalk/index.css';
import 'ant-design-vue/dist/antd.css';

// 全局使用ui组件
Vue.use(Vant);
Vue.use(ElementUI);
Vue.use(Antd);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

// 页面title修改
router.beforeEach((to, from, next) => {
  // 路由发生变化修改页面title
  if (to.meta.title) {
    document.title = to.meta.title || '阳光漫画';
    document.documentElement.setAttribute('lang', 'zh');
  }
  next()
})

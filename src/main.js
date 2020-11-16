import Vue from "vue";
import App from "./index.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

// 引入公用脚本与样式
import 'reset-css';
import './assets/icon/iconfont.css'

// 引入ui组件
import Vant, {Toast} from 'vant';
import ElementUI from 'element-ui';
import Antd from 'ant-design-vue';

// 引入组件css
import 'vant/lib/index.css';
import 'vant/lib/icon/local.css';
import 'element-ui/lib/theme-chalk/index.css';
import 'ant-design-vue/dist/antd.css';
import fa from "element-ui/src/locale/lang/fa";

// 全局使用ui组件
Vue.use(Vant);
Vue.use(ElementUI);
Vue.use(Antd);

Vue.prototype.$msg = Toast;
Vue.prototype.$reading = false;
Vue.prototype.$mark = {
    title: '阳光漫画',
    reading: false,
};
Vue.config.productionTip = false;

var vue = new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");

// 页面title修改
router.beforeEach((to, from, next) => {
    // 路由发生变化修改页面title
    if (to.meta.title) {
        document.title = Vue.prototype.$mark.title = to.meta.title || '阳光漫画';
        document.documentElement.setAttribute('lang', 'zh');
    }
    next()
})

import Vue from 'vue'
import App from './App'
import ajax from './api/api.js'
import stronge from './api/stronge.js'

Vue.config.productionTip = false

App.mpType = 'app'
const version = 3.7;

Vue.prototype.$version = version;

Vue.prototype.$ajax = ajax;

Vue.prototype.$stronge = stronge;

Vue.prototype.$userInfo = {
	isLogin:false
};

const app = new Vue({
    ...App
})

app.$mount()

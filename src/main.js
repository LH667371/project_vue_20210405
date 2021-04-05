// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// 导入element-ui
import ElementUI from 'element-ui'
// 导入element-ui的样式
import "element-ui/lib/theme-chalk/index.css"

import axios from "axios";
Vue.prototype.$axios = axios

// 全局注册element
Vue.use(ElementUI)

Vue.config.productionTip = false

// 设置全局的css
import "../static/css/style.css"

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: {App},
    template: '<App/>'
})

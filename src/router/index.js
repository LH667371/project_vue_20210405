import Vue from 'vue'
import Router from 'vue-router'
import login from '../components/login'
import Register from '../components/register'
import index from '../components/index'
Vue.use(Router)

export default new Router({
    routes: [
        {path: '/', component: login},
        {path: '/register', component: Register},
        {path: '/index', component: index},
    ]
})

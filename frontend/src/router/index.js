import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: () => import('../layouts/Default.vue'),
        children: [
            {
                path: '/',
                name: 'Home',
                component: () => import('../views/Home.vue')
            },
            {
                path: '/posts/create',
                name: 'CreatePost',
                component: () => import('../views/CreatePost.vue')
            },
            {
                path: '/posts/search',
                name: 'SearchPost',
                component: () => import('../views/Search.vue')
            },
            {
                path: '/posts/edit/:id',
                name: 'EditPost',
                props: true,
                component: () => import('../views/EditPost.vue')
            }
        ],
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router

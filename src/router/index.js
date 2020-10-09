import Vue from "vue";
import VueRouter from "vue-router";
import list from "../views/list";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "list",
        component: list,
        meta: {
            title: '阳光漫画-列表'
        }
    },
    {
        path: '/menu',
        name: 'menu',
        meta: {
            keepAlive: true,
            title: '阳光漫画-目录'
        },
        component: () => import("../views/menu"),

    },
    {
        path: '/view',
        name: 'view',
        meta: {
            title: '阳光漫画-浏览'
        },
        component: () => import("../views/view")
    },
    {
        path: '/test',
        name: 'test',
        meta: {
            title: '阳光漫画-调试'
        },
        component: () => import("../test")
    },
];

const router = new VueRouter({
    routes
});

export default router;

import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "@/views/Dashboard.vue";
import Tables from "@/views/Tables.vue";
import Billing from "@/views/Billing.vue";
import Approvisionnement from "@/views/Approvisionnement.vue";
import Profile from "@/views/Profile.vue";
import Rtl from "@/views/Rtl.vue";
import SignIn from "@/views/SignIn.vue";
import SignUp from "@/views/SignUp.vue";
import Login from "@/views/Login.vue";
import store from '../store';

const routes = [{
        path: "/",
        name: "/",
        redirect: "/sign-in",
    },
    {
        path: "/dashboard",
        name: "Dashboard",
        component: Dashboard,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: "/tables",
        name: "Tables",
        component: Tables,
    },
    
    {
        path: "/billing",
        name: "Billing",
        component: Billing,
    },
    {
        path: "/appro",
        name: "Approvisionnement",
        component: Approvisionnement,
    },
    {
        path: "/profile",
        name: "Profile",
        component: Profile,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: "/rtl-page",
        name: "Rtl",
        component: Rtl,
    },
    {
        path: "/sign-in",
        name: "Sign In",
        component: SignIn,
    },
    {
        path: "/sign-up",
        name: "Sign Up",
        component: SignUp,
        meta: {
            requiresAuth: true,
        },
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
    linkActiveClass: "active",
});
router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !localStorage.getItem('token')) {
        next({
            name: '/login'
        });

    } else {
        next();
    }

});

export default router;
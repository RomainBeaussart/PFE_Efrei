import Vue from 'vue';
import Router, { Route } from 'vue-router';
import gql from 'graphql-tag';
import { createProvider } from './vue-apollo';

import store from './store/store';

import Index from './views/Index.vue';

import Home from './views/Home.vue';

Vue.use(Router);

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            component: Index,
            // redirect: { name: 'dashboard' },
            children: [
                { path: '/', name: 'home', component: Home }
            ]
        },
    ]
});

export default router

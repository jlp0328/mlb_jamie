import Vue from 'vue';
import Router from 'vue-router';
import Landing from "@/components/Landing";
import Stats from "@/components/Stats";

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/', 
            name: "Home",
            component: Landing
        },
        {
            path: '/player/:id', 
            name: "Hitting Stats",
            component: Stats,
            props: true
        }
    ]
});
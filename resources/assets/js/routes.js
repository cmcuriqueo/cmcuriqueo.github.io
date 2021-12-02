import VueRouter from 'vue-router';

var Contact = require('./components/Pages/Contact').default;

var About = require('./components/Pages/About').default;

let routes = [
    {
        path: '/contact',
        name: 'contact',
        component: Contact
    },
    {
        path: '/about',
        name: 'about',
        component: About
    },
];


export default new VueRouter({
	routes
});
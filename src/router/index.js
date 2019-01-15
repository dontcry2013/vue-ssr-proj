import Vue from 'vue'
import Router from 'vue-router'
import VueMeta from 'vue-meta';
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Item from '../views/Item.vue'
import Whatever from '../views/Whatever.vue'
import NotFound from '../views/NotFound.vue'

Vue.use(Router)
Vue.use(VueMeta)

export function createRouter(){
	return new Router({
		mode: 'history',
		/*scrollBehavior() {
	      return { y: 0 };
	    },
		linkActiveClass: 'menu__item_active',*/
		routes: [
			{ path: '/', name: 'home', component: Home },
			{ path: '/about', name: 'about', component: About },
			{ path: '/whatever', name: 'whatever', component: Whatever },
			{ path: '/item/:id(\\d+)', name: 'item', props: true, component: Item },
			{ path: '*',component: NotFound },
		]
	})
}
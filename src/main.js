import Vue from 'vue'
import App from './App.vue'
import { createRouter } from './router'
import { createStore } from './store'
import { sync } from 'vuex-router-sync'
import Axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(
  VueAxios,
  Axios.create({
    baseURL: 'http://localhost:8080/',
  })
);

export function createApp(ssrContext){
	const router = createRouter()
	const store = createStore()

	sync(store, router)

	const app = new Vue({
		router,
		store,
		ssrContext,
		render: h => h(App)
	})

	return { app, router, store }
}
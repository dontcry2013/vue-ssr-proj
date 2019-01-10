import Vue from 'vue'
import { createApp } from './main.js'

Vue.mixin({
  	beforeRouteUpdate (to, from, next) {
    	const { asyncData } = this.$options
	    if (asyncData) {
	      	asyncData({
	        	store: this.$store,
	        	route: to
	      	}).then(next).catch(next)
	    } else {
	      	next()
	    }
	}
})


const { app, router, store } = createApp()

if(window.__INITIAL_STATE__){
	console.log('from entry-client', window.__INITIAL_STATE__)
	store.replaceState(window.__INITIAL_STATE__)
}

app.$mount('#app')
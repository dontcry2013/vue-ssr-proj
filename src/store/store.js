import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import { fetchItemApi } from '../api'

export function createStore(){
	return new Vuex.Store({
		state: {
			items: {}
		},
		actions: {
			fetchItem({ commit }, id){
				return fetchItemApi(id).then(item => {
					commit('setItem', { id, item })
				})
			}
		},
		mutations: {
			setItem(state, { id, item }){
				Vue.set(state.items, id, item)
			}
		}
	})
}
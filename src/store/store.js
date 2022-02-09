import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
	cardList:[]
}
import mutations from './mutations';
import actions from './action';
export const store = new Vuex.Store({
  state,
  mutations,
	actions
})


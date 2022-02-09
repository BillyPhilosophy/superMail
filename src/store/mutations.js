import {ADD_COUNT,ADD_NEWGOODS} from './mutations_type'

const mutations = {
	[ADD_COUNT](state,payload){
		payload.count++;
	},
	[ADD_NEWGOODS](state,payload){
		state.cardList.push(payload);
	}
}
export default mutations
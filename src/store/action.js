import {ADD_COUNT,ADD_NEWGOODS} from './mutations_type'
const actions = {
	addCard ({state,commit},payload) {
		const oldProduct =  state.cardList.find((item)=>item.iid===payload.iid);
		if(oldProduct){
			commit(ADD_COUNT,oldProduct);
		}else{
			payload.count = 1;
			payload.checked = false;
			commit(ADD_NEWGOODS,payload);
		}
	}
}
export default actions
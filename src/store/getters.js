
const getters={
	cartLength(state){
		return state.cardList.length
	},
	cartList(state){
		return state.cardList
	}
}

export default getters
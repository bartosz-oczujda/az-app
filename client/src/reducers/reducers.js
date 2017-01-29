import { RECEIVE_MEDICINE_LIST } from '../actions/index.js'

let reducer = (state, action) => {
	switch (action.type) {
		case RECEIVE_MEDICINE_LIST:
			return Object.assign({}, state, {
				medicines: action.data.map( medicine => medicine.eng_name )
			});
			break;
		default:
			return state;
	}
}

export default reducer;
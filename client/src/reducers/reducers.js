import { RECEIVE_MEDICINE_LIST } from '../actions/index.js'

let reducer = (state, action) => {
	switch (action.type) {
		case RECEIVE_MEDICINE_LIST:
			return Object.assign({}, state, {
				medicineList: action.data.map( medicine => { return { english_name: medicine.english_name, id: medicine._id } } )
			});
			break;
		default:
			return state;
	}
}

export default reducer;

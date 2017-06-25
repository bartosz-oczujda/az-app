export const GET_MEDICINE_LIST = 'GET_MEDICINE_LIST';
function getMedicineList() {
	return {
		type: 'GET_MEDICINE_LIST'
	}
}

export const RECEIVE_MEDICINE_LIST = 'RECEIVE_MEDICINE_LIST';
function receiveMedicineList(json) {
	return {
		type: 'RECEIVE_MEDICINE_LIST',
		data: json
	}
}

export function fetchMedicineList() {
	return function(dispatch) {
		dispatch(getMedicineList());
		fetch(`${API_URL}/api/medicine/`)
			.then(response => response.json()
				.then( json => dispatch(receiveMedicineList(json)))  

			);

	}
}





export const GET_MEDICINE_DETAILS = 'GET_MEDICINE_DETAILS';
function getMedicineDetails() {
	return {
		type: 'GET_MEDICINE_DETAILS'
	}
}

export const RECEIVE_MEDICINE_DETAILS = 'RECEIVE_MEDICINE_DETAILS';
function receiveMedicineDetails(json) {
	return {
		type: 'RECEIVE_MEDICINE_DETAILS',
		data: json
	}
}

export function fetchMedicineDetails(id) {
	return function(dispatch) {
		dispatch(getMedicineDetails());
		fetch(`${API_URL}/api/medicine/detail/${id}`)
			.then(response => response.json()
				.then( json => dispatch(receiveMedicineDetails(json)))  

			);

	}
}

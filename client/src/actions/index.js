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
		fetch('http://localhost:8080/api/medicine/')
			.then(response => response.json()
				.then( json => dispatch(receiveMedicineList(json)))  

			);

	}
}

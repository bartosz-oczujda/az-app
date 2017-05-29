import React from 'react';
import { connect } from 'react-redux';
import { fetchMedicineList } from './actions/index'
import MedicineListItemComponent from "./MedicineListItemComponent.jsx"

class MedicineListComponent extends React.Component {

	constructor(props) {
		super(props);
		console.log(props);
		this.props.dispatch(fetchMedicineList());
	}

	render() {

		let inputData = this.props.medicineList;

		return (
			<div style={{float:"left", width:"300px"}}>
				{inputData.map((medicine, i) => <MedicineListItemComponent key={i} id={medicine.id} name={medicine.english_name}/>)} 
			</div>
		);
	};

	onNameClick(event) {
		alert(event.target.innerHTML);
	}

}

function mapStateToProps(state) {
	return state;
}

export default connect(mapStateToProps)(MedicineListComponent);

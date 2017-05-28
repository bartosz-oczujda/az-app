import React from 'react';
import { connect } from 'react-redux';
import { fetchMedicineList } from './actions/index'

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
				{inputData.map((medicine, i) => <p key={i} onClick={this.onNameClick}>{medicine.english_name}</p>)} 
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

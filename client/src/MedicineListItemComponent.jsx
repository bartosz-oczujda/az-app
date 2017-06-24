import React from 'react';
import { connect } from 'react-redux';
import { fetchMedicineDetails } from './actions/index'

class MedicineListItemComponent extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
                <li className="medicineItem" onClick={this.onNameClick.bind(this)}>{this.props.name}</li>
		);
	};

	onNameClick(event) {
		this.props.dispatch(fetchMedicineDetails(this.props.id));
	}

}

function mapStateToProps(state) {
	return state;
}

export default connect(mapStateToProps)(MedicineListItemComponent);

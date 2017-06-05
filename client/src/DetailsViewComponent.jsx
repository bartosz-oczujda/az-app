import React from 'react';
import { connect } from 'react-redux';

class DetailsViewComponent extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {


		return (
			<div>
				<strong>Names:</strong>
				<div>
					<span>{this.props.selectedMedicineDetails.english_name}</span>
					<span>{this.props.selectedMedicineDetails.latin_name}</span>
					<span>{this.props.selectedMedicineDetails.polish_name}</span>
					<span>{this.props.selectedMedicineDetails.german_name}</span>
				</div>
				<strong>Ailments:</strong>
				<div>
					<span>{this.props.selectedMedicineDetails.ailments}</span>
				</div>
				<strong>Active ingredients:</strong>
				<div>
					<span>{this.props.selectedMedicineDetails.active_ingredients}</span>
				</div>
				<strong>Organisms:</strong>
				<div>
					<span>{this.props.selectedMedicineDetails.organisms}</span>
				</div>
				<strong>Description:</strong>
				<div>
                	<span>{this.props.selectedMedicineDetails.description}</span>
				</div>
				<strong>Additional info:</strong>
				<div>
					<span>{this.props.selectedMedicineDetails.additional_info}</span>
				</div>
			</div>
		);
	};

}

function mapStateToProps(state) {
	return state;
}

export default connect(mapStateToProps)(DetailsViewComponent);

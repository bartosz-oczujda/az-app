import React from 'react';
import { connect } from 'react-redux';

class DetailsViewComponent extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {


		return (
			<div style={{display:"inline"}}>
				<p>{this.props.english_name}</p>
				<p>{this.props.latin_name}</p>
				<p>{this.props.polish_name}</p>
				<p>{this.props.german_name}</p>
				<p>{this.props.ailments}</p>
				<p>{this.props.active_ingredients}</p>
				<p>{this.props.organisms}</p>
                <p>{this.props.selectedMedicineDetails}</p>
				<p>{this.props.additional_info}</p>
			</div>
		);
	};

}

function mapStateToProps(state) {
	return state;
}

export default connect(mapStateToProps)(DetailsViewComponent);

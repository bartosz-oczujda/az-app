import React from 'react';
import { connect } from 'react-redux';

class DetailsViewComponent extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {


		return (
			<div style={{float:"left"}}>
                <p>These are details</p>
			</div>
		);
	};

}

function mapStateToProps(state) {
	return state;
}

export default connect(mapStateToProps)(DetailsViewComponent);

import React from 'react';
import { connect } from 'react-redux';
import { fetchMedicineList } from './actions/index'

class ButtonComponent extends React.Component {

	constructor(props) {
		super(props);
		console.log(props);
		this.onPress = this.onPress.bind(this);
	}

	onPress() {
		this.props.dispatch(fetchMedicineList());
	}

	render() {

		let inputData = this.props.medicines;

		return (
			<div>
				Data: {inputData.map((medicine, i) => <p key={i} onClick={this.onNameClick}>{medicine}</p>)} 
				<div><button onClick={this.onPress}>get</button></div>
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

export default connect(mapStateToProps)(ButtonComponent);

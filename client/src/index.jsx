import React from 'react';
import { render } from 'react-dom';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';
import MedicineListComponent from './MedicineListComponent.jsx';
import DetailsViewComponent from "./DetailsViewComponent.jsx"
import { connect } from 'react-redux';

const initialState = {
	medicineList: [],
	selectedMedicineDetails: ""
};

const store = configureStore(initialState);

class App extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<MedicineListComponent/>
				<DetailsViewComponent/>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return state;
}

export default connect(mapStateToProps)(App);

render(<Provider store={store}><App/></Provider>, document.getElementById('app'));

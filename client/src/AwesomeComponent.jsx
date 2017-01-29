import React from 'react';
import { connect } from 'react-redux';
import { fetchMedicineList } from './actions/index'

class AwesomeComponent extends React.Component {
    
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
                Data: {inputData} 
                <div><button onClick={this.onPress}>get</button></div>
            </div>
        );
    };

}

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps)(AwesomeComponent);

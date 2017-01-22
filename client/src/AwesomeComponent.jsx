import React from 'react';

class AwesomeComponent extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = { data: 0 };
        this.onPress = this.onPress.bind(this);
    }

    onPress() {
        fetch('http://localhost:8080/api/medicine/').then(response => {
            response.json().then( json => {
                this.setState({ data: json });
            })  

        });
    }

    render() {
        console.log(this.state.data);

        let inputData = this.state.data ? this.state.data.map( med => <p>{`${med.eng_name} ${med.type}`}</p> ) : "";
        
        return (
            <div>
                Data: {inputData} 
                <div><button onClick={this.onPress}>get</button></div>
            </div>
        );
    }
}

export default AwesomeComponent;

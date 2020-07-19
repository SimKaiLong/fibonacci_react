import React, {Component} from 'react';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            num_elements: null,
            results: null,
            errormessage: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        let err = '';
        if (nam === "num_elements") {
            if (val !== "" && !Number(val)) {
                err = <strong>Number of elements must be a number!</strong>;
                val = null;
            } else if (Number(val) && !(1 <= val && val <= 100)) {
                err = <strong>Number of elements must be a number between 1 and 100!</strong>;
                val = null;
            } else {
                val = null;
            }
        }
        this.setState({'errormessage': err});
        this.setState({[nam]: val});
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if (this.state.errormessage !== '' || this.state.num_elements === null) {
            this.setState({'errormessage': <strong>Please key in a valid value before submitting</strong>});
        } else {
            fetch(`http://168.138.205.119:8000/fibonacci?elements=${this.state.num_elements}`)
                .then(res => res.json())
                .then((data) => {
                    this.setState({results: data});
                })
                .catch(console.log)
        }
    }

    render() {
        let json_output;
        // Check if the current results is an array and non-empty
        if (this.state.results) {
            json_output = this.state.results
        }
        return (
            <form onSubmit={this.handleSubmit}>
                <div className={"container"}>
                    <div className={"row"}>
                        <h2>Fibonacci Sequence</h2>
                    </div>
                    <div className={"form-group row"}>
                        <div className={"col-lg-3 col-md-3 col-sm-4"}>
                            <label className={"col-form-label col-form-label"}>Number of elements:</label>
                        </div>
                        <div className={"col-lg-7 col-md-7 col-sm-6"}>
                            <input type={'text'} name={'num_elements'} placeholder={"E.g. 10"}
                                   className={"form-control"}
                                   id={"num_elements_label"}
                                   onChange={this.handleChange}/>
                        </div>
                        <div className={"col-lg-2 col-md-2 col-sm-2"}>
                            <input className={"btn btn-primary"} type="submit" value="Submit"/>
                        </div>
                    </div>
                    <div className={"form-group row"}>
                        {this.state.errormessage}
                    </div>
                    <div className="form-group row">
                        <div className="col-lg-12 col-md-12 col-sm-12 card">
                            <div className={"card-body"}>
                                <pre style={{height: '70vh', overflowX: 'hidden'}}>
                                    {JSON.stringify(json_output, null, 4)}
                                </pre>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}

export default App;

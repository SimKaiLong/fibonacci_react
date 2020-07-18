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
                err = <strong>Number of elements must be a number</strong>;
            } else if (Number(val) && !(1 <= val && val <= 100)) {
                err = <strong>Number of elements must be a number between 1 and 100</strong>;
            }
        }
        this.setState({['errormessage']: err});
        this.setState({[nam]: val});
    }

    handleSubmit = (event) => {
        // alert('num_elements submitted: ' + this.state.num_elements);
        event.preventDefault();
        fetch(`http://168.138.205.119:8000/fibonacci?elements=${this.state.num_elements}`)
            .then(res => res.json())
            .then((data) => {
                this.setState({results: data});
            })
            .catch(console.log)
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
                    <h2>Fibonnaci Sequence</h2>
                    <div className={"row"}>
                        <div className="col-lg-4 col-md-4 col-sm-12">
                            <div className="form-group">
                                <label>Number of elements:</label>
                                <input type='text' name='num_elements' className={"form-control"}
                                       onChange={this.handleChange}/>
                                {this.state.errormessage}
                            </div>
                            <input className={"btn btn-primary"} type="submit" value="Submit"/>
                        </div>
                        <div className="col-lg-8 col-md-8 col-sm-12 card" >
                            <div className={"card-body"}>
                            <pre style={{
                                height: '60vh',
                                overflowX: 'hidden'
                            }}>{JSON.stringify(json_output, null, 4)}</pre>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}

export default App;

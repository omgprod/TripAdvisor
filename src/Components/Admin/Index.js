import React, {Component} from "react";

export default class Panel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            emailLogin: '',
            username: '',
            password: '',
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    };




    render() {
        return (
            <React.Fragment>

            </React.Fragment>
        );
    }
}

import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";

import Navbar from "./Components/Navbar/Navbar";
import Index from "./Components/Index";
import Connect from "./Components/User/Account"

import './App.css';

class App extends Component {
    render() {
        return (
            <Router>
                <React.Fragment>
                    <Navbar/>
                    <br />
                    <Route exact path="/" component={Index}/>
                    <Route path="/account" component={Connect}/>
                </React.Fragment>
            </Router>
        );
    }
}

export default App;

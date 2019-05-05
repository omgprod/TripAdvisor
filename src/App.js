import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import 'toasted-notes/src/styles.css';
import './App.css';

/* View Components*/
import Navbar from "./Components/Navbar/Navbar"
// Footer missing

/* Hotels Components */
import Hotels from "./Components/Hotels/Index"
import Rooms from "./Components/Hotels/Room"

/* Flights Components*/
import Planes from "./Components/Planes/Index"

/* Restaurants Components*/
import Restaurants from "./Components/Restaurants/Index"
import RestaurantRoom from "./Components/Restaurants/Room"

/* Users Components */
import Connect from "./Components/User/RegisterAndLogin"
import Panel from "./Components/User/Panel"
import Admin from "./Components/Admin/Index"


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogged: false,
        };
    }

    render() {
        return (
            <Router>
                <React.Fragment>
                    <Navbar/>
                    <br />
                    {/* Hotels Routes*/}
                    <Route exact path="/" component={Hotels}/>
                    <Route exact path="/hotels/room/:id" component={Rooms}/>
                    {/* Restaurants Routes*/}
                    <Route path="/restaurants" component={Restaurants}/>
                    <Route path="/restaurants/room/:id" component={RestaurantRoom}/>
                    {/* Flights Routes*/}
                    <Route path="/flights" component={Planes}/>
                    {/* Users Routes*/}
                    <Route path="/account" component={Connect}/>
                    <Route path="/panel" component={Panel}/>
                    <Route path="/admin" component={Admin}/>
                </React.Fragment>
            </Router>
        );
    }
}

export default App;

import React, {Component} from 'react';
import axios from 'axios';


export default class Index extends Component {
    constructor(props){
        super(props);
        this.state = {
            events: [],
            isLoading: true,
            x: 0.0,
            y: 0.0
        };
        this.loc = this.loc.bind(this);
    }

    componentDidMount() {
        document.addEventListener('FBObjectReady', this.initializeFacebookLogin);

            console.log(this.state.x, this.state.y);

            var x = this.state.x;
            var y = this.state.y;
            if (x !== 0 && y !== 0) {
                var config = {
                    headers: {'Access-Control-Allow-Origin': '*'}
                }
                axios.get("https://www.eventbriteapi.com/v3/events/search?location.longitude="+ y +"&location.latitude="+ x +"&location.within=20km&token=4KGRYDVZUD5AOWRCDBP5", config)
                    .then(data => {
                        console.log(data)
                        var events = data.data.events;
                        this.setState({
                            events: events,
                            isLoading: false
                        });
                        console.log(this.state.events)
                    }).catch(error => {
                    throw error;
                });
            } else {
                document.addEventListener('FBObjectReady', this.initializeFacebookLogin);
                axios.get("https://www.eventbriteapi.com/v3/events/search?location.address=paris&location.within=20km&token=4KGRYDVZUD5AOWRCDBP5", config)
                    .then(data => {
                        console.log(data)
                        var events = data.data.events;
                        this.setState({
                            events: events,
                            isLoading: false
                        });
                        console.log(this.state.events)
                    }).catch(error => {
                    throw error;
                });
            }
    }

    initializeFacebookLogin = () => {
        this.FB = window.FB;
        this.checkLoginStatus();
    }

    facebookLogin = () => {
        if (!this.FB) return;

        this.FB.getLoginStatus(response => {
            if (response.status === 'connected') {
                this.facebookLoginHandler(response);
            } else {
                this.FB.login(this.facebookLoginHandler, {scope: 'public_profile'});
            }
        }, );
    }


    componentWillMount() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.loc);
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }

    loc(position){
        var x = position.coords.latitude;
        var y = position.coords.longitude;
        localStorage.setItem('x', x);
        localStorage.setItem('y', y);
        this.setState({
            x: x,
            y: y
        });
    }

    render() {
        const {events, isLoading} = this.state;
        return (
            <React.Fragment>
                <div className="container">
                    <hr/>
                    <h1 className={'Title'}>Wac Events</h1>
                    <hr/>
                    <div className="container-fluid">
                        <div className="form-row">
                            {!isLoading ? (
                            events.map((item, i) => <div className="col-md-4" key={i} style={{padding: 10}}>
                                    <div className="card" style={{width: "18rem"}}>
                                        <div className="card-body">
                                            <img className="card-img-top"
                                                 src={!item.logo.url ? "" : ""}
                                                 alt={"Card" + i}/>
                                            <h5 className="card-title">Stock: {item.inventory_type}</h5>
                                            <p className="card-text">{item.name.text}</p>
                                        </div>
                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item">Start: {item.start.local}</li>
                                            <li className="list-group-item">End: {item.end.local}</li>
                                            <li className="list-group-item">{item.start.timezone}</li>
                                        </ul>
                                        <div className="card-body">
                                            <a href="/" className="card-link">More Info</a>
                                            <a href="/" className="card-link">Website Page</a>
                                        </div>
                                    </div>
                                </div>
                            )) : <img src={"http://localhost:3000/img/Spinner-1s-200px.gif"}
                                      alt="loader"
                                      className={'loader'}
                            /> }
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

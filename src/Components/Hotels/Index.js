import React, {Component} from 'react';
import axios from 'axios';

export default class Hotels extends Component {
    constructor(props){
        super(props);
        this.state = {
            hotels: [],
            isLoading: true,
            x: 0.0,
            y: 0.0
        };
        this.loc = this.loc.bind(this);
    }

    componentDidMount() {
        this.getHotels();
    }

    getHotels = () => {
        axios.get('http://localhost:1337/hotels', {
        }).then(response => {
                console.log('Data: ', response.data);
                this.setState({hotels:response.data});
                this.setState({isLoading:false});
            }).catch(error => {
                console.log('An error occurred:', error);
            });
    };

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
        const {hotels, isLoading} = this.state;
        return (
            <React.Fragment>
                <div className="container-fluid" >
                    <hr/>
                    <h1 className={'Title'}>My Trip Advisor</h1>
                    <hr/>
                    <div className="container-fluid" style={{marginLeft:'10%', marginRight:'10%'}}>
                        <div className="form-row align-items-center" >
                            {!isLoading ? (
                                hotels.map((item, i) => <div className="col-auto" key={i} style={{padding: 20}}>
                                        <div className="card" style={{width: "18rem"}}>
                                            <div className="card-body" style={{height:500}}>
                                                <p className="card-text-inline" style={{textAlign:'center'}}><strong>{item.name}</strong></p>
                                                <img className="card-img-top"
                                                     src={"http://localhost:1337"+item.pictures[0].url}
                                                     alt={"Card" + i}
                                                style={{height:200,width:250}}/>
                                                <hr/>
                                                <p style={{width:'100%', height:100, marginTop:10}}>{item.description}</p>
                                            </div>
                                            <hr/>
                                            <div className="form-inline" style={{marginLeft:20, marginBottom:10}}>
                                                <a href={'/hotels/room/'+ item.id} className="card-link">More informations</a>
                                                <a href="/" className="card-link">Reserve now!</a>
                                            </div>
                                            <hr/>
                                            <div className="form-inline" style={{marginLeft:30, marginBottom:10}}>
                                                <p className="card-title" style={{marginLeft:5}}> Price: </p> <h5 style={{marginBottom:15, marginLeft:5}}>{item.price}$</h5>
                                                <p className="card-title" style={{marginLeft:120}}><i className="fas fa-heart">{item.likes.length}</i></p>
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


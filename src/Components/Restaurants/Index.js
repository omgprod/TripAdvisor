import React, {Component} from "react";
import axios from "axios";


export default class Restaurants extends Component {
    constructor(props) {
        super(props);
        this.state = {
            restaurants: [],
            isLoading: true,
        };
    }

    componentDidMount() {
        this.getRestaurants();
    }

    getRestaurants = () => {
        axios.get('http://localhost:1337/restaurants', {
        }).then(response => {
            console.log('Data: ', response.data);
            this.setState({restaurants:response.data});
            this.setState({isLoading:false});
        }).catch(error => {
            console.log('An error occurred:', error);
        });
    };

    render() {
        const {restaurants, isLoading} = this.state;
        return (
            <React.Fragment>
                <div className="container">
                    <hr/>
                    <h1 className={'Title'}>My Trip Advisor</h1>
                    <hr/>
                    <div className="container-fluid">
                        <div className="form-row align-items-center" >
                            {!isLoading ? (
                                restaurants.map((item, i) => <div className="col-auto" key={i} style={{padding: 20}}>
                                        <div className="card" style={{width: "18rem"}}>
                                            <div className="card-body" style={{height:500}}>
                                                <p className="card-text-inline" style={{textAlign:'center', fontSize:20}}>{item.name}</p>
                                                <img className="card-img-top"
                                                     src={"http://localhost:1337"+item.pictures.url}
                                                     alt={"Card" + i}
                                                     style={{height:200,width:250}}/>
                                                <hr/>
                                                <p style={{width:'100%', marginTop:10}}><strong>Where:</strong> {item.address}</p>
                                                <p style={{width:'100%', marginTop:10}}><strong>Food type: </strong>{item.type}</p>
                                                <p style={{width:'100%', marginTop:10}}><strong>Contact: </strong> +33 {item.contact}</p>
                                                <p style={{width:'100%', marginTop:10}}><strong>They speak: </strong> {item.language}</p>
                                            </div>
                                            <hr/>
                                            <div className="form-inline" style={{marginLeft:'28%', marginBottom:10}}>
                                                <a href={'/restaurants/room/'+ item.id} className="card-link" style={{textAlign:'center'}}>More Infos here</a>
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
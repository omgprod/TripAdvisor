import React, {Component} from "react";
import axios from "axios";
import toast from 'toasted-notes';
import 'toasted-notes/src/styles.css';

export default class Room extends Component {
    constructor(props) {
        super(props);
        this.state = {
            room: [],
            url: false,
            comment: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleEventNotCodded = this.handleEventNotCodded.bind(this);
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    };

    handleEventNotCodded(event){
        event.preventDefault();
        toast.notify(
            'Troll: Feature not codded yet. ',
            { duration: 3000, position:'bottom-right', alignItems: "center"}
        );
    }

    componentDidMount() {
        this.getRoom();
    }

    getRoom() {
        axios.get('http://localhost:1337/hotels/' + this.props.match.params.id, {}).then(response => {
            //console.log('Room: ', response.data);
            this.setState({room: response.data});
            this.setState({url: response.data.pictures[0].url});
            this.setState({isLoading: false});
        }).catch(error => {
            console.log('An error occurred:', error);
        });
    };

    render() {
        const {room} = this.state;
        return (
            <React.Fragment>
                <div className="container">
                    <hr/>
                    <h1 className={'Title'}>My Trip Advisor</h1>
                    <hr/>
                    <div className="form-row">
                        <div className="col">
                            <form onSubmit={this.handleEventNotCodded}>
                                <div className="card" style={{textAlign: 'center'}}>
                                    <div className="card-header">
                                        <h5>{room.name}</h5>
                                    </div>
                                    <div className="card-body">
                                        <p className="card-title">{room.picture}</p>
                                        <img className="card-img-top"
                                             src={"http://localhost:1337" + this.state.url}
                                             alt={"Card"}
                                             style={{height: 200, width: 400, marginBottom: 20}}/>
                                        <br/>
                                        <div style={{textAlign: 'center'}}>
                                            <div className="card-body">
                                                <p className="card-title">{room.description}</p>
                                                <hr/>
                                                <p className="card-title" style={{marginTop: 10}}>get this room
                                                    for: {room.price} $</p>
                                                <hr/>
                                                <button className={'myBtn'}
                                                        type='submit'>Book this room
                                                </button>
                                                <hr/>
                                                <button className={'myBtn'}
                                                        type='submit'>Like this room
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        {/* Room Comments & Reviews */}
                        <div className="col" style={{textAlign: 'center'}}>
                            <div className="form-group">
                                <div className="card">
                                    <div className="card-header">
                                        <h5>More Information about the room:</h5>
                                    </div>
                                    <div className="card-body">
                                        {/* Have to map comment for this room */}
                                        <div id="" style={{overflow: 'scroll', height: 515}}>
                                            <p>Include</p>
                                            <p className="card-body">Lorem ipsum dolor sit amet, consectetur adipisicing
                                                elit. Adipisci deserunt doloremque expedita impedit itaque libero nihil
                                                ullam unde ut voluptatum. Aliquam atque dolores id molestias nemo, quas
                                                repudiandae soluta temporibus.</p>
                                            <hr/>
                                            <p>Parking hourly:</p>
                                            <p className="card-body">Lorem ipsum dolor sit amet, consectetur adipisicing
                                                elit. A, exercitationem, iusto? Accusantium adipisci explicabo molestias
                                                mollitia odit reprehenderit sint ut! A adipisci officiis sit. At
                                                corporis fugit libero molestiae praesentium.</p>
                                            <hr/>
                                            <p>Payment method</p>
                                            <p className="card-body">Lorem ipsum dolor sit amet, consectetur adipisicing
                                                elit. A, exercitationem, iusto? Accusantium adipisci explicabo molestias
                                                mollitia odit reprehenderit sint ut! A adipisci officiis sit. At
                                                corporis fugit libero molestiae praesentium.</p>
                                            <hr/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                {/* Give a Comment to Room */}
                <div className="container">
                    <hr/>
                    <div className="form-row">
                        <div className="col">
                            <form onSubmit={this.handleEventNotCodded}>
                                <div className="card" style={{textAlign: 'center'}}>
                                    <div className="card-header">
                                        <h5>Post a comment:</h5>
                                    </div>
                                    <div className="card-body">
                                        <div style={{textAlign: 'center'}}>
                                            <div className="card-body">
                                                <textarea name="body"
                                                          onChange={this.handleChange}
                                                          value={this.state.comment}
                                                style={{width:'100%', height:100}}/>
                                                <hr/>
                                                <button className={'myBtn'}
                                                        type='submit'>Post your comment
                                                </button>
                                                <hr/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        {/* Room Comments & Reviews */}
                        <div className="col" style={{textAlign: 'center'}}>
                            <div className="form-group">
                                <div className="card">
                                    <div className="card-header">
                                        <h5>Comments & Reviews</h5>
                                    </div>
                                    <div className="card-body">
                                        {/* Have to map comment for this room */}
                                        <div id="" style={{overflow: 'scroll', height: 400}}>
                                            <p>Posted by: User01</p>
                                            <p className="card-body">Lorem ipsum dolor sit amet, consectetur adipisicing
                                                elit. Adipisci deserunt doloremque expedita impedit itaque libero nihil
                                                ullam unde ut voluptatum. Aliquam atque dolores id molestias nemo, quas
                                                repudiandae soluta temporibus.</p>
                                            <hr/>
                                            <p>Posted by: User01</p>
                                            <p className="card-body">Lorem ipsum dolor sit amet, consectetur adipisicing
                                                elit. A, exercitationem, iusto? Accusantium adipisci explicabo molestias
                                                mollitia odit reprehenderit sint ut! A adipisci officiis sit. At
                                                corporis fugit libero molestiae praesentium.</p>
                                            <hr/>
                                            <p>Posted by: User01</p>
                                            <p className="card-body">Lorem ipsum dolor sit amet, consectetur adipisicing
                                                elit. A, exercitationem, iusto? Accusantium adipisci explicabo molestias
                                                mollitia odit reprehenderit sint ut! A adipisci officiis sit. At
                                                corporis fugit libero molestiae praesentium.</p>
                                            <hr/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

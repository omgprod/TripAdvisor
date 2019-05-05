import React, {Component} from "react";
import toast from 'toasted-notes'
import 'toasted-notes/src/styles.css';
import axios from 'axios';


export default class Panel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            username: '',
            password: '',
            passwordBis: '',
            user:  {
            },
            jwt: localStorage.getItem('token')
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleAccountChange = this.handleAccountChange.bind(this);
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    };


    componentDidMount() {
        this.getUsers();
        if(this.state.jwt){
            this.setState({isLogged: true})
        }

    }

    getUsers = () => {
        this.setState({
            email: '',
            username: '',
            password: '',
            passwordBis: '',
        });
        axios.get('http://localhost:1337/users/me', {
            headers: {
                Authorization: `Bearer ${this.state.jwt}`
            }
        })
            .then(response => {
                console.log('Data: ', response.data);
                this.setState({user: response.data})
            })
            .catch(error => {
                console.log('An error occurred:', error);
            });
    };


    handleAccountChange(event) {
        event.preventDefault();
        const {email, username, password, passwordBis} = this.state;
        if (email !== '' && username !== '') {
            let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            let validEmail = regex.test(email);
            if (validEmail) {
                if (password === passwordBis && password != null && passwordBis != null) {
                    let name = username.trim().toLowerCase();
                    if (name) {
                        axios.put('http://localhost:1337/users/'+this.state.user.id,{
                            username: username,
                            email: email,
                            password: password
                        }, {
                            headers: {
                                Authorization: `Bearer ${this.state.jwt}`
                            }}).then(response => {
                            // Handle success.
                            toast.notify(
                                'Success: User is now modified. ',
                                { duration: 3000, position:'bottom-right', alignItems: "center"}
                            );
                            this.getUsers();
                            this.props.history.push('/panel');
                        }).catch(error => {
                            toast.notify(
                                'Something went wrong: '+ error + '.',
                                { duration: 3000, position:'bottom-right', alignItems: "center"}
                            );
                        });
                    } else {
                        // Error Username already in database
                        toast.notify(
                            'Something went wrong: Username is too long or too short. ',
                            { duration: 3000, position:'bottom-right', alignItems: "center"}
                        );
                    }
                } else {
                    // Error bad password
                    toast.notify(
                        'Something went wrong: the two passwords doesnt match.',
                        { duration: 3000, position:'bottom-right', alignItems: "center"}
                    );
                }
            } else {
                // Error invalid email
                toast.notify(
                    'Something went wrong: email is invalid.',
                    { duration: 3000, position:'bottom-right', alignItems: "center"}
                );
            }
        } else {
            // Error please fill the entire inputs requierments
            toast.notify(
                'Something went wrong: Please fill all inputs required.',
                { duration: 3000, position:'bottom-right', alignItems: "center"}
            );
        }
    };

    render() {
        const { user } = this.state;
        return (
            <React.Fragment>
                <div className="container">
                    <hr/>
                    <h1 className={'Title'}>Welcome Back {user.username}</h1>
                    <hr/>
                    <div className="form-row">
                        {/*** Register ***/}
                        <div className="col">
                            <form onSubmit={this.handleAccountChange}>
                                <div className="card" style={{textAlign: 'center'}}>
                                    <div className="card-header">
                                        <h2>Modify your account</h2>
                                    </div>
                                    <div className="card-body">
                                        <h5 className="card-title">{user.email}</h5>
                                        <input className="card-text" type="email" placeholder="new e-mail" name={'email'}
                                               style={{textAlign: 'center'}} value={this.state.email}
                                               onChange={this.handleChange}/><br/>

                                        <h5 className="card-title" style={{marginTop: 10}}>{user.username}</h5>
                                        <input className="card-text" type="text" placeholder="username"
                                               name={'username'}
                                               style={{textAlign: 'center'}} value={this.state.username}
                                               onChange={this.handleChange}/><br/>

                                        <h5 className="card-title" style={{marginTop: 10}}>New password</h5>
                                        <input className="card-text" type="password" placeholder="******"
                                               name={'password'}
                                               style={{textAlign: 'center'}}
                                               value={this.state.password} onChange={this.handleChange}/><br/>
                                        <h5 className="card-title" style={{marginTop: 10}}>Repeat-Password</h5>
                                        <input className="card-text" type="password" placeholder="******"
                                               name={'passwordBis'}
                                               style={{marginBottom: 10, textAlign: 'center'}}
                                               value={this.state.passwordBis} onChange={this.handleChange}/><br/>
                                        <hr/>
                                        <hr/>
                                        <button className={'myBtn'}
                                                type='submit'>Change your information
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        {/*** Login ***/}
                        <div className="col" style={{textAlign: 'center'}}>
                            <div className="form-group">
                                <form onSubmit={this.handleSubmitLogin}>
                                    <div className="card">
                                        <div className="card-header">
                                            <h2>Dashboard</h2>
                                        </div>
                                        <div className="card-body">
                                            <h5 className="card-title">You have: 0 comments</h5>
                                            <hr/>
                                            <h5 className="card-title">You have a total of: 0 likes</h5>
                                            <hr/>
                                            <h5 className="card-title" style={{marginTop: 10}}>You have reserved: 0 hotels</h5>
                                            <hr/>
                                            <h5 className="card-title" style={{marginTop: 10}}>You have reserved: 0 flights</h5>
                                            <hr/>
                                            <h5 className="card-title" style={{marginTop: 10}}>You have like: 0 restaurants</h5>
                                            <hr/>
                                            <h5 className="card-title" style={{marginTop: 10}}>You have like: 0 hotels</h5>
                                            <hr/>
                                            <button className="myBtn" type='submit'>See all your reservations</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

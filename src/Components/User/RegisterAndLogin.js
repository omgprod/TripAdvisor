import React, {Component} from 'react';
import toast from 'toasted-notes';
import 'toasted-notes/src/styles.css';
import axios from 'axios';

export default class RegisterAndLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            emailLogin: '',
            username: '',
            password: '',
            passwordLogin: '',
            passwordBis: '',
            showModal: false,
            isLogged: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmitRegister = this.handleSubmitRegister.bind(this);
        this.handleSubmitLogin = this.handleSubmitLogin.bind(this);
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    };

    /*
    * Submit Register
    * Check Email, Username, Password, PasswordBis
    * returns token & Object.user but not stocked
    */
    handleSubmitRegister(event) {
        event.preventDefault();
        const {email, username, password, passwordBis} = this.state;
        if (email !== '' && username !== '') {
            let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            let validEmail = regex.test(email);
            if (validEmail) {
                if (password === passwordBis && password != null && passwordBis != null) {
                    let name = username.trim().toLowerCase();
                    if (name) {
                        axios.post('http://localhost:1337/auth/local/register', {
                            username: username,
                            email: email,
                            password: password
                        }).then(response => {
                            // Handle success.
                            toast.notify(
                                'Success: User is now registred. ',
                                { duration: 3000, position:'bottom-right', alignItems: "center"}
                            );
                            this.props.history.push('/account');
                            this.forceUpdate();
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

    /*
    * Submit Login
    * Check Email, Password
    * returns token & Object.user
    */
    handleSubmitLogin(event) {
        event.preventDefault();
        const {emailLogin, passwordLogin} = this.state;
        if(!emailLogin && !passwordLogin){
            toast.notify(
                'Something went wrong: Please fill all inputs required.',
                { duration: 3000, position:'bottom-right', alignItems: "center"}
            );
        }else{
            axios.post('http://localhost:1337/auth/local', {
                identifier: emailLogin,
                password: passwordLogin
            }).then(response => {
                localStorage.setItem('token', response.data.jwt);
                localStorage.setItem('role', response.data.user.role.name);
                this.setState({
                    username: response.data.user.username,
                    email: response.data.user.email,
                    jwt: response.data.jwt,
                    isLogged: true,
                });
                toast.notify(
                    'Welcome Back ' + response.data.user.username,
                    { duration: 3000, position:'bottom-right', alignItems: "center"}
                );
                this.props.history.push('/panel');
            }).catch(error => {
                console.log('An error occurred:', error);
                toast.notify(
                    'Something went wrong: ' + error,
                    { duration: 3000, position:'bottom-right', alignItems: "center"}
                );
            });
        }
    }


    render() {
        return (
            <React.Fragment>
                <div className="container">
                    <hr/>
                    <h1 className={'Title'}>My Trip Advisor</h1>
                    <hr/>
                    <div className="form-row">
                        {/*** Register ***/}
                        <div className="col">
                            <form onSubmit={this.handleSubmitRegister}>
                                <div className="card" style={{textAlign: 'center'}}>
                                    <div className="card-header">
                                        <h2>Register</h2>
                                    </div>
                                    <div className="card-body">
                                        <h5 className="card-title">E-mail</h5>
                                        <input className="card-text" type="email" placeholder="e-mail" name={'email'}
                                               style={{textAlign: 'center'}} value={this.state.email}
                                               onChange={this.handleChange}/><br/>

                                        <h5 className="card-title" style={{marginTop: 10}}>Username</h5>
                                        <input className="card-text" type="text" placeholder="username"
                                               name={'username'}
                                               style={{textAlign: 'center'}} value={this.state.username}
                                               onChange={this.handleChange}/><br/>

                                        <h5 className="card-title" style={{marginTop: 10}}>Password</h5>
                                        <input className="card-text" type="password" placeholder="******"
                                               name={'password'}
                                               style={{textAlign: 'center'}}
                                               value={this.state.password} onChange={this.handleChange}/><br/>
                                        <h5 className="card-title" style={{marginTop: 10}}>Repeat-Password</h5>
                                        <input className="card-text" type="password" placeholder="******"
                                               name={'passwordBis'}
                                               style={{marginBottom: 20, textAlign: 'center'}}
                                               value={this.state.passwordBis} onChange={this.handleChange}/><br/>
                                        <hr/>
                                        <button className={'myBtn'}
                                                type='submit'>Register
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
                                            <h2>Login</h2>
                                        </div>
                                        <div className="card-body">
                                            <h5 className="card-title">E-mail</h5>
                                            <input className="card-text" type="email" placeholder="e-mail" name={'emailLogin'}
                                                   style={{textAlign: 'center'}} value={this.state.emailLogin}
                                                   onChange={this.handleChange}/><br/>

                                            <h5 className="card-title" style={{marginTop: 10}}>Password</h5>
                                            <input className="card-text" type="password" placeholder="******" name={'passwordLogin'}
                                                   style={{marginBottom: 20, textAlign: 'center'}}
                                                   value={this.state.passwordLogin}
                                                   onChange={this.handleChange}/><br/>
                                            <hr/>
                                            <button className="myBtn" type='submit'>Login</button>
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

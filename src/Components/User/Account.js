import React, {Component} from 'react';



export default class Account extends Component {
    constructor(props){
        super(props);
        this.state = {

        };
    }

    componentDidMount() {

    }

    render() {

        return (
            <React.Fragment>
                <div className="container">
                    <hr/>
                    <h1 className={'Title'}>Wac Events</h1>
                    <hr/>
                    <div className="form-row">
                        {/*** Register ***/}
                        <div className="col">
                            <form action="">
                                <div className="card" style={{textAlign: 'center'}}>
                                    <div className="card-header">
                                        <h2>Register</h2>
                                    </div>
                                    <div className="card-body">
                                        <h5 className="card-title">E-mail</h5>
                                        <input className="card-text" type="email" placeholder="e-mail"
                                               style={{textAlign: 'center'}}/><br/>

                                        <h5 className="card-title" style={{marginTop: 10}}>Username</h5>
                                        <input className="card-text" type="text" placeholder="username"
                                               style={{textAlign: 'center'}}/><br/>

                                        <h5 className="card-title" style={{marginTop: 10}}>Password</h5>
                                        <input className="card-text" type="password" placeholder="******"
                                               style={{textAlign: 'center'}}/><br/>

                                        <h5 className="card-title" style={{marginTop: 10}}>Repeat-Password</h5>
                                        <input className="card-text" type="password" placeholder="******"
                                               style={{marginBottom: 20, textAlign: 'center'}}
                                        /><br/>
                                        <hr/>
                                        <a href="/" className="myBtn">Register</a>
                                    </div>
                                </div>
                            </form>
                        </div>
                        {/*** Login ***/}
                        <div className="col" style={{textAlign: 'center'}}>
                            <div className="form-group">
                                <form action="">
                                    <div className="card">
                                        <div className="card-header">
                                            <h2>Login</h2>
                                        </div>
                                        <div className="card-body">
                                            <h5 className="card-title">Username</h5>
                                            <input className="card-text" type="email" placeholder="e-mail"
                                                   style={{textAlign: 'center'}}/><br/>

                                            <h5 className="card-title" style={{marginTop: 10}}>Password</h5>
                                            <input className="card-text" type="password" placeholder="******"
                                                   style={{marginBottom: 20, textAlign: 'center'}}
                                            /><br/>
                                            <hr/>
                                            <a href="/" className="myBtn">Login</a>
                                            <hr/>
                                            <div className="fbButton">
                                                <div className="fb-login-button" data-size="large" data-button-type="login_with"
                                                     data-auto-logout-link="false" data-use-continue-as="true"></div>
                                            </div>
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

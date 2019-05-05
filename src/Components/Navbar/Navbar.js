import React, {Component} from 'react';
import { Link } from "react-router-dom";
import toast from 'toasted-notes'
import 'toasted-notes/src/styles.css';

export default class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchClass: false,
            isHovering: false,
            jwt: localStorage.getItem('token'),
        };
        this.handleMouseHover = this.handleMouseHover.bind(this);
    }

    toggleSearch() {
        this.setState({searchClass: !this.state.searchClass});
    }

    handleMouseHover() {
        this.setState(this.toggleHoverState);
    }

    toggleHoverState(state) {
        return {
            isHovering: !state.isHovering,
        };
    }

    componentDidMount() {
        let token = this.state.jwt;
        (token) ? this.setState({isLogged: true}) : this.setState({isLogged: false});
        (token) ? this.forceUpdate() : this.forceUpdate();
    }

    logout(){
        localStorage.removeItem('token');
        toast.notify(
            'See you soon!',
            { duration: 3000, position:'bottom-right', alignItems: "center"}
        );
        this.forceUpdate();
    }


    render() {
        let barClass = ["navbar "];
        if (this.state.searchClass) {
            barClass.push('search-open');
        }
        return (
            <React.Fragment>
                <nav className={barClass.join('')}>
                    <div className="overlay btn-close"/>
                    <div className="container d-flex">
                        <a href="http://localhost:3000/" className="logo">
                            <img src={"http://localhost:3000/img/world.png"}
                                 alt="logo"
                                 className={'logo'}
                                 style={{marginTop: 5}}
                            />
                        </a>
                        <ul>
                            <Link to="/" className={'navAccount'}><i className="fas fa-hotel" style={{fontSize: 40}}></i></Link>
                            <Link to="/flights" className={'navAccount'}><i className="fas fa-plane-arrival" style={{fontSize: 40}}></i></Link>
                            <Link to="/restaurants" className={'navAccount'}><i className="fas fa-utensils" style={{fontSize: 40}}></i></Link>
                            <div>
                                <div onMouseEnter={this.handleMouseHover}
                                     onMouseLeave={this.handleMouseHover}>
                                    {this.state.jwt ?
                                        <Link to="/panel" className={'navAccount'}><i className="fas fa-user" style={{fontSize: 40}}></i></Link>:
                                        <Link to="/account" className={'navAccount'}><i className="fas fa-user" style={{fontSize: 40}}></i></Link>}
                                    {this.state.jwt ?
                                        <Link to="/" onClick={this.logout} className={'navAccount'}><i className="fas fa-power-off" style={{fontSize: 40}}></i></Link>:
                                        null}
                                </div>
                            </div>
                        </ul>
                        <div className="search-box">
                            <div className="search-box-container">
                                <div className="search-box-bg">
                                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
                                         xmlnsXlink="http://www.w3.org/1999/xlink" width={18} height={18}
                                         viewBox="0 0 17 17">
                                        <g>
                                        </g>
                                        <path
                                            d="M16.604 15.868l-5.173-5.173c0.975-1.137 1.569-2.611 1.569-4.223 0-3.584-2.916-6.5-6.5-6.5-1.736 0-3.369 0.676-4.598 1.903-1.227 1.228-1.903 2.861-1.902 4.597 0 3.584 2.916 6.5 6.5 6.5 1.612 0 3.087-0.594 4.224-1.569l5.173 5.173 0.707-0.708zM6.5 11.972c-3.032 0-5.5-2.467-5.5-5.5-0.001-1.47 0.571-2.851 1.61-3.889 1.038-1.039 2.42-1.611 3.89-1.611 3.032 0 5.5 2.467 5.5 5.5 0 3.032-2.468 5.5-5.5 5.5z"/>
                                    </svg>
                                </div>
                                <input type="text" name="search" placeholder="Search..."/>

                                <div className="btn-close">
                                    <div className="form-group">
                                        <div className="row">
                                            <i className="fas fa-times" onClick={this.toggleSearch.bind(this)}></i>
                                        </div>
                                        <div className="row">
                                            <i className="fas fa-globe-europe"
                                               onClick={this.toggleSearch.bind(this)}></i>
                                        </div>
                                    </div>
                                </div>
                                <div className="search-result">
                                    <h6>Top result</h6>
                                </div>
                            </div>
                        </div>
                        <div className="search-icon">
                            <div className="btn-search" onClick={this.toggleSearch.bind(this)}>
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
                                     xmlnsXlink="http://www.w3.org/1999/xlink" width={18} height={18}
                                     viewBox="0 0 17 17">
                                    <g/>
                                    <path
                                        d="M16.604 15.868l-5.173-5.173c0.975-1.137 1.569-2.611 1.569-4.223 0-3.584-2.916-6.5-6.5-6.5-1.736 0-3.369 0.676-4.598 1.903-1.227 1.228-1.903 2.861-1.902 4.597 0 3.584 2.916 6.5 6.5 6.5 1.612 0 3.087-0.594 4.224-1.569l5.173 5.173 0.707-0.708zM6.5 11.972c-3.032 0-5.5-2.467-5.5-5.5-0.001-1.47 0.571-2.851 1.61-3.889 1.038-1.039 2.42-1.611 3.89-1.611 3.032 0 5.5 2.467 5.5 5.5 0 3.032-2.468 5.5-5.5 5.5z"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                </nav>
            </React.Fragment>
        );
    }
}
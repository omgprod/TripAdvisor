import React, { Component } from 'react';


export default class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {searchClass: false}
    }
    toggleSearch() {
        this.setState({searchClass: !this.state.searchClass});
    }
    render() {
        let barClass = ["navbar "];
        if(this.state.searchClass) {
            barClass.push('search-open');
        }
        return (
            <React.Fragment>
                    <nav className={barClass.join('')}>
                        <div className="overlay btn-close" />
                        <div className="container d-flex">
                            <a href="http://localhost:3000/" className="title">
                                <svg viewBox="0 0 7.66 7.12">
                                    <path d="M4.78,7.12,3.86,4.78l-1,2.34L0,0H1.1L2.93,4.75,3.4,3.63,2,0H3L4.78,4.62,6.59,0H7.66Z" />
                                </svg>
                            </a>
                            <ul>
                                <a href="/"><i className="fas fa-calendar-alt" style={{fontSize: 30}}></i></a>
                                <a href="/account" className={'navAccount'}><i className="fas fa-user" style={{fontSize: 30}}></i></a>
                            </ul>
                            <div className="search-box">
                                <div className="search-box-container">
                                    <div className="search-box-bg">
                                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width={18} height={18} viewBox="0 0 17 17">
                                            <g>
                                            </g>
                                            <path d="M16.604 15.868l-5.173-5.173c0.975-1.137 1.569-2.611 1.569-4.223 0-3.584-2.916-6.5-6.5-6.5-1.736 0-3.369 0.676-4.598 1.903-1.227 1.228-1.903 2.861-1.902 4.597 0 3.584 2.916 6.5 6.5 6.5 1.612 0 3.087-0.594 4.224-1.569l5.173 5.173 0.707-0.708zM6.5 11.972c-3.032 0-5.5-2.467-5.5-5.5-0.001-1.47 0.571-2.851 1.61-3.889 1.038-1.039 2.42-1.611 3.89-1.611 3.032 0 5.5 2.467 5.5 5.5 0 3.032-2.468 5.5-5.5 5.5z" />
                                        </svg>
                                    </div>
                                    <input type="text" name="search" placeholder="Search..." />

                                        <div className="btn-close">
                                            <div className="form-group">
                                                <div className="row">
                                                    <i className="fas fa-times" onClick={this.toggleSearch.bind(this)}></i>
                                                </div>
                                                <div className="row">
                                                    <i className="fas fa-globe-europe" onClick={this.toggleSearch.bind(this)}></i>
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
                                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width={18} height={18} viewBox="0 0 17 17">
                                        <g />
                                        <path d="M16.604 15.868l-5.173-5.173c0.975-1.137 1.569-2.611 1.569-4.223 0-3.584-2.916-6.5-6.5-6.5-1.736 0-3.369 0.676-4.598 1.903-1.227 1.228-1.903 2.861-1.902 4.597 0 3.584 2.916 6.5 6.5 6.5 1.612 0 3.087-0.594 4.224-1.569l5.173 5.173 0.707-0.708zM6.5 11.972c-3.032 0-5.5-2.467-5.5-5.5-0.001-1.47 0.571-2.851 1.61-3.889 1.038-1.039 2.42-1.611 3.89-1.611 3.032 0 5.5 2.467 5.5 5.5 0 3.032-2.468 5.5-5.5 5.5z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </nav>
            </React.Fragment>
        );
    }
}
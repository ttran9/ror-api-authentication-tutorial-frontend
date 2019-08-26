import React, { Component, Fragment } from 'react';
import Registration from './auth/Registration';
import Login from './auth/Login';
import axios from "axios";

export class Home extends Component {
    constructor(props) {
        super(props);
    }

    handleSuccessfulAuth = data => {
        // update parent component.
        this.props.handleLogin(data);
        this.props.history.push("/dashboard");
    }

    handleLogoutClick = () => {
        axios.delete("http://localhost:3001/logout", { withCredentials: true})
        .then(response => {
            this.props.handleLogout();
        })
        .catch(error => {
            console.log("logout error", error);
        });

    }

    render() {
        let logoutContent = <Fragment/>;
        if(this.props.loggedInStatus === 'LOGGED_IN') {
            logoutContent = (
                <button onClick={() => this.handleLogoutClick()}>Logout</button>
            );
        }
        return (
            <div>
             <h1>Home</h1>   
             <h1>Status: {this.props.loggedInStatus} </h1> 
             {logoutContent}
             <br/>
             <Registration handleSuccessfulAuth={this.handleSuccessfulAuth}/>
             <br/>
             <Login handleSuccessfulAuth={this.handleSuccessfulAuth} />
            </div>
        )
    }
}

export default Home;

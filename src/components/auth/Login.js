import React, { Component } from 'react';
import axios from 'axios';

export default class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
          email: "",
          password: "",
          loginErrors: ""
        };
    }

    handleSubmit = event => {
        event.preventDefault();
        const {
            email,
            password,
        } = this.state;
        axios.post("http://localhost:3001/sessions", {
            user: {
                email: email,
                password: password,
            }
        },
        /*
         * without "withCredentials" we are in an "in between state" where we have created a user or logged them in successfully but the 
         * cookie inside of the browser will not show that the user is logged in.
         */
        { withCredentials: true} // this third argument tells the API to set the cookie in our client.
        ).then(response => {
            console.log("res from login", response);
            // console.log("registration response", response);
            if(response.data.logged_in) {
                this.props.handleSuccessfulAuth(response.data);
            }
        }).catch(error => {
            console.log("login error", error);
        });
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {
        return (
            <div>
               <form onSubmit={this.handleSubmit}>
                <input type="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleChange} required />
                <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} required />
                <button type="submit">Login</button>
               </form>
            </div>
        );
    }
};


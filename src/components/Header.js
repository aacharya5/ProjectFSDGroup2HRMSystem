import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Modal from 'react-modal';
import axios from 'axios';
//import FacebookLogin from 'react-facebook-login';
//import GoogleLogin from 'react-google-login';

import '../Styles/header.css';
const API_URL = require('../contants').API_URL;

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '450px'
    }
}

Modal.setAppElement('#root');

class Header extends Component {

    constructor() {
        super();
        this.state = {
            backgroundStyle: '',
            isLoginModalOpen: false,
            isSignupModalOpen: false,
           // isUpdateProfileModalOpen: false,
            username: '',
            password: '',
            firstName: '',
            lastName: '',
            customerType: '',
            user: undefined,
            isLoggedIn: false,
            loginError: undefined,
            signUpError: undefined
        }
    }

    componentDidMount() {
        const initialPath = this.props.history.location.pathname;
        this.setHeaderStyle(initialPath);
        this.props.history.listen((location, action) => {
            this.setHeaderStyle(location.pathname);
        })
    }
    
    setHeaderStyle = (path) => {
        let bg = '';
        if (path == '/' || path == '/home') {
            bg = 'transparent';
        } else {
            bg = 'coloured';
        }
        this.setState({
            backgroundStyle: bg
        });
    }

    navigate = (path) => {
        this.props.history.push(path);
    }

    openLoginModal = () => {
        this.setState({
            isLoginModalOpen: true
        });
    }

    openProfileModal = () => {
        this.setState({
            isUpdateProfileModalOpen: true
        });
    }

    closeLoginModal = () => {
        this.setState({
            isLoginModalOpen: false
        });
    }

    closeProfileModal = () => {
        this.setState({
            isUpdateProfileModalOpen: false
        });
    }

    cancelUpdateHanlder = () => {
        this.closeProfileModal();
    }


    loginHandler = () => {
        const { username, password, lastName, firstName, customerType } = this.state;
        const req = {
            username: username,
            password: password
        }
        axios({
            method: 'POST',
            url: `${API_URL}/login`,
            headers: { 'Content-Type': 'application/json' },
            data: req
        }).then(result =>  {
            const user = result.data.user;
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("isLoggedIn", true);
            this.setState({
                user: user,
                firstName: user.firstName,
                lastName: user.lastName,
                customerType: customerType,            
                isLoggedIn: true,
                loginError: undefined,
                isLoginModalOpen: false
            });
            console.log("Header JS " + user.firstName);
        }).catch(err => {
            this.setState({
                isLoggedIn: false,
                loginError: "Username or password is wrong"
            })
        });
    }

    cancelLoginHanlder = () => {
        this.closeLoginModal();
    }

    openSignupModal = () => {
        this.setState({
            isSignupModalOpen: true
        });
    }

    closeSignupModal = () => {
        this.setState({
            isSignupModalOpen: false
        });
    }

    signupHandler = () => {
        //console.log('Post Call'+ username + password + firstName + lastName);
        const { username, password, firstName, lastName, customerType} = this.state;
        const req = {
            email: username,
            password: password,
            firstName: firstName,
            lastName: lastName,
            customerType: customerType
        }
        axios({
            method: 'POST',
            url: `${API_URL}/signup`,
            headers: { 'Content-Type': 'application/json' },
            data: req
        }).then(result =>  {
            const user = result.data.user;
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("isLoggedIn", true);
            this.setState({
                user: user,
                isLoggedIn: true,
                signUpError: undefined,
                isSignupModalOpen: false
            });
        }).catch(err => {
            console.log('Request ');
            console.log('Connected to Mongo DB !', err);
            this.setState({
                isLoggedIn: false,
                signUpError: "Error Signing up"
            })
        });
    }

    profileUpdateHandler = () => {
        //console.log('Post Call'+ username + password + firstName + lastName);
        const { username, password, firstName, lastName} = this.state;
        const req = {
            email: username,
            password: password,
            firstName: firstName,
            lastName: lastName
        }
        axios({
            method: 'POST',
            url: `${API_URL}/update`,
            headers: { 'Content-Type': 'application/json' },
            data: req
        }).then(result =>  {
            const user = result.data.user;
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("isLoggedIn", true);
            console.log("Updated successfully!");
            this.setState({
                user: user,
                isLoggedIn: true,
                signUpError: undefined,
                isUpdateProfileModalOpen: false
            });
        }).catch(err => {
            console.log('Update data', req)
            console.log('Request ');
            console.log('Connected to Mongo DB !', err);
            this.setState({
                isLoggedIn: false,
                signUpError: "Error updating profile"
            })
        });
    }


    cancelSignupHanlder = () => {
        this.closeSignupModal();
    }

    logout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("isLoggedIn");
        this.setState({
            user: undefined,
            isLoggedIn: false
        });
    }

    handleChange = (e, field) => {
        const val = e.target.value;
        this.setState({
            [field]: val,
            loginError: undefined,
            signUpError: undefined
        })
    }

    /*faceBookLogin = (e) => {
        debugger

        // TODO: Learner Task to continue with the login or Signup flow
    }

    googleLogin = (e) => {
        debugger

        // TODO: Learner Task to continue with the login or Signup flow
    }
    */
    render() {
        const { backgroundStyle, isLoginModalOpen, isSignupModalOpen, isUpdateProfileModalOpen, username, password, firstName, lastName, customerType, loginError, signUpError, isLoggedIn, user } = this.state;
        console.log("User detail" + firstName + lastName)
        return (
            <React.Fragment>
                <div className="app-header" style={{ 'background': backgroundStyle == 'transparent' ? 'transparent' : '#eb2929'  }}>
                    <div className="container">
                        <div className="row">
                            <div className="logoSection col-6">
                                {
                                    backgroundStyle == 'transparent'
                                    ?
                                    null
                                    :
                                    <div className="logo-small" onClick={() => this.navigate('/home')}>e!</div>
                                }
                            </div>
                            <div className="loginSection col-6">
                                {
                                  isLoggedIn 
                                    ?
                                    <>
                                        <span className="text-white m-4">{firstName}</span>
                                        <button className="loginButton" onClick={this.logout}>Logout</button>
                                        <button className="updateProfileButton" onClick={this.openProfileModal}>Profile</button>
                                    </>
                                    :
                                    <>
                                        <button className="loginButton" onClick={this.openLoginModal}>Login</button>
                                        <button className="createAccountButton" onClick={this.openSignupModal}>Create an account</button>
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <Modal isOpen={isLoginModalOpen} style={customStyles}>
                    <h2>
                        Login
                        <button onClick={this.closeLoginModal} className="btn btn-outline-danger float-end">X</button>
                    </h2>
                    <form className="mt-4">
                        { loginError ? <div className="alert alert-danger text-center my-3">{loginError}</div> : null }
                        <input className="form-control" type="text" placeholder="Email" required value={username} onChange={(e) => this.handleChange(e, 'username')}/>
                        <input className="form-control my-3" type="password" placeholder="Password" required value={password} onChange={(e) => this.handleChange(e, 'password')}/>
                        <div className="text-center">
                            <input type="button" className="btn btn-primary m-2" onClick={this.loginHandler} value="Login" />
                            <button className="btn" onClick={this.cancelLoginHanlder}>Cancel</button>
                        </div>
                    </form>
                </Modal>
                <Modal isOpen={isSignupModalOpen} style={customStyles}>
                    <h2>
                        Signup
                        <button onClick={this.closeSignupModal} className="btn btn-outline-danger float-end">X</button>
                    </h2>
                    <form className="mt-4">
                        { signUpError ? <div className="alert alert-danger text-center my-3">{signUpError}</div> : null }
                        <input className="form-control" type="text" placeholder="Email" required value={username} onChange={(e) => this.handleChange(e, 'username')}/>
                        <input className="form-control my-3" type="password" placeholder="Password" required value={password} onChange={(e) => this.handleChange(e, 'password')}/>
                        <input className="form-control my-3" type="text" placeholder="Firstname" required value={firstName} onChange={(e) => this.handleChange(e, 'firstName')}/>
                        <input className="form-control my-3" type="text" placeholder="Lastname" required value={lastName} onChange={(e) => this.handleChange(e, 'lastName')}/>
                        
                        <div onChange={(e) => this.handleChange(e, 'customerType')}>
                            <input type="radio" value="Buyer" name="customerType" /> Buyer
                            <input type="radio" value="Seller" name="customerType" /> Seller
                        </div>
                        <div className="text-center">
                            <input type="button" className="btn btn-primary m-2" onClick={this.signupHandler} value="Signup" />
                            <button className="btn" onClick={this.cancelSignupHanlder}>Cancel</button>
                        </div>
                    </form>
                </Modal>
                <div>
                           
                <Modal isOpen={isUpdateProfileModalOpen} style={customStyles}>
                        <h2>
                            Profile
                            <button onClick={this.closeProfileModal} className="btn btn-outline-danger float-end">X</button>
                        </h2>
                        <h8>
                            User can update Name fields and click on Save
                        </h8>
                        <form className="mt-4">
                            <input className="form-control" type="text" disabled={true} placeholder="Email" required value={username} onChange={(e) => this.handleChange(e, 'username')}/>
                            <input className="form-control my-3" type="text" placeholder="Firstname" required value={firstName} onChange={(e) => this.handleChange(e, 'firstName')}/>
                            <input className="form-control my-3" type="text" placeholder="Lastname" required value={lastName} onChange={(e) => this.handleChange(e, 'lastName')}/>

                            <div className="text-center">
                                <input type="button" className="btn btn-primary m-2" onClick={this.profileUpdateHandler} value="Save Changes" />
                                <button className="btn" onClick={this.cancelUpdateHanlder}>Cancel</button>
                            </div>  
                        </form>
                    
                </Modal> 
                </div>
            </React.Fragment>
        )
    }
}

//export default Header;

export default withRouter(Header);

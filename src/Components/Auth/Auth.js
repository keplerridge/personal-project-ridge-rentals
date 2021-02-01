import axios from 'axios';
import {Component} from 'react';
import {connect} from 'react-redux';
import {getUser} from '../../redux/reducer';

class Auth extends Component {
    constructor(props){
        super(props)
        this.state = {
            email: '',
            password: '',
            verPassword: '',
            registerView: false,
            admin: true
        }
    }

    componentDidMount(){
        if(this.props.user.user_id){
            this.props.history.push('/')
            alert('Already logged in, please logout before trying to login in to another account')
        }
    }

    handleInput = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

    handleToggle = () => {
        this.setState({registerView: !this.state.registerView})
    }

    register = () => {
        const {email, password, verPassword, admin} = this.state;

        if(password && password === verPassword) {
            axios.post('/auth/register', {email, password, admin})
            .then(res => {
                this.props.getUser(res.data)
                console.log(this.props.user)
                this.props.history.push('/')
            })
            .catch(err => {
                console.log(err)
                alert('Email already in use, please login or select another')
                this.setState({email: '', password: '', verPassword: ''})
            })
        } else {
            alert('Passwords do not match')
        }
    }

    login = () => {
        const {email, password} = this.state;

        axios.post('/auth/login', {email, password})
        .then(res => {
            this.props.getUser(res.data)
            this.props.history.push('/profile')
        })
        .catch(err => {
            console.log(err)
            alert('Email or password incorrect')
            this.setState({email: '', password: ''})
        })
    }

    render(){
        return(
            <div>
                <section>
                    <h2>Ridge Rentals</h2>
                    {this.state.registerView 
                    ? (
                        <div>
                            <h3>REGISTER</h3>
                            <input
                                value={this.state.email}
                                name='email'
                                placeholder='Email Address'
                                onChange={e => this.handleInput(e)} />
                            <input
                                value={this.state.password}
                                name='password'
                                placeholder='Password'
                                type='password'
                                onChange={e => this.handleInput(e)} />
                            <input
                                value={this.state.verPassword}
                                name='verPassword'
                                placeholder='Verify Password'
                                type='password'
                                onChange={e => this.handleInput(e)} />
                            <button onClick={this.register}>Register</button>
                        </div>
                    ) : (
                        <div>
                            <h3>Login Here</h3>
                            <input
                                value={this.state.email}
                                name='email'
                                placeholder='Email Address'
                                onChange={e => this.handleInput(e)} />
                            <input
                                value={this.state.password}
                                name='password'
                                placeholder='Password'
                                type='password'
                                onChange={e => this.handleInput(e)} />
                            <button onClick={this.login}>LOGIN</button>
                            <p>Need an account? <span onClick={this.handleToggle}>REGISTER HERE</span></p>
                        </div>
                    )}
                </section>
            </div>
        )
    }
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps, {getUser})(Auth);


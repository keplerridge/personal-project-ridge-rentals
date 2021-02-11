import axios from 'axios';
import {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {getUser} from '../../redux/reducer';
import './Auth.css';

const Auth = props => {
    const [email, setEmail] = useState(''),
          [password, setPassword] = useState(''),
          [verPassword, setVerPassword] = useState(''),
          [registerView, setRegisterView] = useState(false),
          [admin, setAdmin] = useState(null);

    useEffect(() => {
        if(props.user.user_id){
            props.history.push('/')
        }
    }, [props])

    const register = () => {

        if(password && password === verPassword) {
            axios.post('/auth/register', {email, password, admin})
            .then(res => {
                props.getUser(res.data)
                console.log(props.user)
                props.history.push('/profile')
            })
            .catch(err => {
                console.log(err)
                alert('Email already in use, please login or select another')
                setEmail('')
                setPassword('')
                setVerPassword('')
            })
        } else {
            alert('Passwords do not match')
        }
    }

    const login = () => {

        axios.post('/auth/login', {email, password})
        .then(res => {
            props.getUser(res.data)
            props.history.push('/profile')
        })
        .catch(err => {
            console.log(err)
            alert('Email or password incorrect')
            setEmail('')
            setPassword('')
        })
    }

        return(
            <div>
                {console.log(props)}
                <section className='form-container'>
                    {registerView 
                    ? (
                        <div className='register'>
                            <h3 id='register-header'>REGISTER</h3>
                            <input
                                value={email}
                                placeholder='Email Address'
                                onChange={e => setEmail(e.target.value)} />
                            <input
                                value={password}
                                placeholder='Password'
                                type='password'
                                onChange={e => setPassword(e.target.value)} />
                            <input
                                value={verPassword}
                                placeholder='Verify Password'
                                type='password'
                                onChange={e => setVerPassword(e.target.value)} />
                            <button onClick={() => register()}>Register</button>
                            <button onClick={() => setRegisterView(false)}>Back</button>
                        </div>
                    ) : (
                        <div className='login-form'>
                            <h3 id='login-header'>Login Here</h3>
                            <input
                                value={email}
                                name='email'
                                placeholder='Email Address'
                                onChange={e => setEmail(e.target.value)} />
                            <input
                                value={password}
                                name='password'
                                placeholder='Password'
                                type='password'
                                onChange={e => setPassword(e.target.value)} />
                            <button id='login-button' onClick={() => login()}>LOGIN</button>
                            <p>Need an account?<br></br><br></br><span onClick={() => setRegisterView(!registerView)}>REGISTER HERE</span></p>
                        </div>
                    )}
                </section>
            </div>
        )
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps, {getUser})(Auth);
import axios from 'axios';
import {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {getUser} from '../../redux/reducer';

const Auth = props => {
    const [email, setEmail] = useState(''),
          [password, setPassword] = useState(''),
          [verPassword, setVerPassword] = useState(''),
          [registerView, setRegisterView] = useState(false),
          [admin, setAdmin] = useState(true);

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
                props.history.push('/')
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
                {console.log(registerView)}
                <section>
                    <h2>Ridge Rentals</h2>
                    {registerView 
                    ? (
                        <div>
                            <h3>REGISTER</h3>
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
                            <button onClik={() => setRegisterView(!registerView)}>Back</button>
                        </div>
                    ) : (
                        <div>
                            <h3>Login Here</h3>
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
                            <button onClick={() => login()}>LOGIN</button>
                            <p>Need an account? <span onClick={() => setRegisterView(!registerView)}>REGISTER HERE</span></p>
                        </div>
                    )}
                </section>
            </div>
        )
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps, {getUser})(Auth);
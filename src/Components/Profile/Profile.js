import axios from 'axios';
import {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {getUser, clearUser} from '../../redux/reducer';
import './Profile.css';

const Profile = props => {
    const [rentalHistory, setRentalHistory] = useState([]),
          [editView, setEditView] = useState(false),
          [passwordEdit,setPasswordEdit] = useState(false),
          [email, setEmail] = useState(''),
          [verEmail, setVerEmail] = useState(''),
          [newPassword, setNewPassword] = useState(''),
          [verNewPassword, setVerNewPassword] = useState(''),
          [adminEmail, setAdminEmail] = useState(''),
          [adminPassword, setAdminPassword] = useState(''),
          [verAdPassword, setVerAdPassword] = useState(''),
          [admin, setAdmin] = useState(null);

  useEffect(() => {
      setAdmin(props.user.admin)
      if(!props.user.email){
            props.history.push('/')
            alert('Plese login or register to view your')
        } else if (!admin) {
            axios.get(`/auth/history/${props.user_id}`)
            .then(res => {
                setRentalHistory(res.data)
            })
            .catch(err => console.log(err))
        }
  }, [props])

    const updateEmail = () => {

        if(email && email === verEmail){
            return( 
                axios.put(`/auth/user/${props.user.user_id}`, {email: email})
                .then(res => {
                    props.getUser(res.data[0])
                    editViews()
                    setEmail('')
                    setVerEmail('')
                    alert('Email updated')
                })
                .catch(err => console.log(err))
            )
        }   
        return alert('Email addresses do not match')
    }

    const updatePassword = () => {

        if(newPassword && newPassword === verNewPassword){
            return(
                axios.put(`/auth/updatepassword/${props.user.user_id}`, {newPassword: newPassword})
                .then(res => {
                    props.getUser(res.data[0])
                    passwordEditView()
                    setNewPassword('')
                    setVerNewPassword('')
                    alert('Password updated')
                })
                .catch(err => console.log(err))
            )
        } else {
            return alert('Passwords do not match')
        }
    }

    const registerAdmin = () => {
        const isAdmin = true;

        if(adminPassword && adminPassword === verAdPassword) {
            axios.post('/auth/registeradmin', {adminEmail, adminPassword, isAdmin})
            .then((res) => {
                console.log(res)
                alert('New Administrator Added')
            })
            .catch(err => {
                console.log(err)
                alert('Email already in use, please use another')
                setAdminEmail('')
                setAdminPassword('')
                setVerAdPassword('')
            })
        } else {
            alert('Passwords do not match')
        }
    }

    const editViews = () => {
        setEditView(!editView)
    }

    const passwordEditView = () => {
        setPasswordEdit(!passwordEdit)
    }

    const logout = () => {
        axios.get('auth/logout')
        .then(() => {
            props.history.push('/')
            props.clearUser()
        })
        .catch(err => console.log(err))
    }

        return(
            <div className='rental-page'>
                    {!admin ? (
                        <section className='rental-history'>
                            <h3>Your Rental History</h3>
                            {rentalHistory.map(equipment => (
                                <div className='equipment' key={equipment.equipment_id}>
                                    <p>{equipment.name}</p>
                                    <p>{equipment.rental_date}</p>
                                    <p>{equipment.equipment_description}</p>
                                </div>
                            ))}
                        </section>
                    ) : (
                        <section>
                            <h2>REGISTER NEW ADMINISTRATOR</h2>
                            <input
                                value={adminEmail}
                                placeholder='New Administrator Email'
                                onChange={e => setAdminEmail(e.target.value)} />
                            <input
                                value={adminPassword}
                                placeholder='New Administrator Password'
                                type='password'
                                onChange={e => setAdminPassword(e.target.value)} />
                            <input
                                value={verAdPassword}
                                placeholder='Verify Administrator Password'
                                type='password'
                                onChange={e => setVerAdPassword(e.target.value)} />
                            <button onClick={() => registerAdmin()}>Register New Administrator</button>
                        </section>
                    )}
                <h3>Account Information</h3>
                {editView
                ? (
                    <div>
                        <h4>Change Email Address</h4>
                        <p>{props.user.email}</p>
                        <input
                                value={email}
                                placeholder='New Email'
                                onChange={e => setEmail(e.target.value)} />
                        <input
                                value={verEmail}
                                placeholder='Confirm New Email'
                                onChange={e => setVerEmail(e.target.value)} />
                        <button onClick={() => updateEmail()}>CONFIRM CHANGE</button>
                        <button onClick={() => editViews()}>BACK</button>
                    </div>
                ) : (
                    <div>
                        <h4>Account Email Address</h4>
                        <p>{props.user.email}</p>
                        <p>Click Here to <span onClick={() => editViews()}>Change Email</span></p>
                        <span onClick={() => passwordEditView()}>Click Here to Update Password</span>
                    </div>
                )}
                {!passwordEdit
                ? (
                    null
                ) : (
                    <section>
                        <input
                            value={newPassword}
                            type='password'
                            placeholder='New Password'
                            onChange={e => setNewPassword(e.target.value)} />
                        <input
                            value={verNewPassword}
                            type='password'
                            placeholder='Confirm New Password'
                            onChange={e => setVerNewPassword(e.target.value)} />
                        <button onClick={() => updatePassword()}>Update Password</button>
                        <button onClick={() => passwordEditView()}>BACK</button>
                    </section>
                )}
                <button onClick={() => logout()}>Logout</button>
            </div>
        )
    }


const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps, {getUser, clearUser})(Profile);
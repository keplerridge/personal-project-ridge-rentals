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
          [admin, setAdmin] = useState(null),
          [userId, setUserId] = useState(null),
          [equipmentId, setEquipmentId] = useState(null);

  useEffect(() => {
      setAdmin(props.user.admin)
      if(!props.user.email){
            props.history.push('/')
            alert('Plese login or register to view your profile')
        } else if (!admin) {
            axios.get(`/auth/history/${props.user.user_id}`)
            .then(res => {
                console.log(res.data)
                res.data.forEach(x => {
                    x.rental_date = new Date(x.rental_date)
                })
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

    const addToRentalHistory = () => {
        axios.post(`/auth/addhistory`, {userId, equipmentId})
        .then((res) => {
            alert(`Added to user: ${userId} rental history`)
        }).catch(err => {
            console.log(err)
            setUserId(null)
            setEquipmentId(null)
        })
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
                            <h3 className='rental-history-header'>YOUR RENTAL HISTORY</h3>
                            {console.log(rentalHistory)}
                            {rentalHistory.map((equipment, i) => (
                                <div className='equipment' key={i}>
                                    <p>{equipment.name}<br></br>{equipment.rental_date.getMonth() + 1}/{equipment.rental_date.getDate()}/{equipment.rental_date.getFullYear()}</p>
                                </div>
                            ))}
                        </section>
                    ) : (
                        <section className='admin-view'>
                            <h2 id='admin-view-header'>REGISTER NEW ADMINISTRATOR</h2>
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
                            <h2>ADD RENTAL TO PROFILE</h2>
                            <input
                                value={userId}
                                placeholder='User ID'
                                onChange={e => setUserId(e.target.value)} />
                            <input
                                value={equipmentId}
                                placeholder='Equipment ID'
                                onChange={e => setEquipmentId(e.target.value)} />
                            <button onClick={() => addToRentalHistory()}>Add to Rental Profile</button>                        
                        </section>
                    )}
                {editView
                ? (
                    <div className='email-edit'>
                        <h4 id='edit-email-header'>Change Email Address</h4>
                        <p id='email-address-edit'>{props.user.email}</p>
                        <input
                                id='edit-input'
                                value={email}
                                placeholder='New Email'
                                onChange={e => setEmail(e.target.value)} />
                        <input
                                id='bottom-edit-input'
                                value={verEmail}
                                placeholder='Confirm New Email'
                                onChange={e => setVerEmail(e.target.value)} />
                        <button onClick={() => updateEmail()}>CONFIRM CHANGE</button>
                        <button onClick={() => editViews()}>BACK</button>
                    </div>
                ) : (
                    <div className='account-information'>
                        <h3>Account Information</h3>
                        <h4>User ID</h4>
                        <p id='email-address'>{props.user.user_id}</p>
                        <h4>Account Email Address</h4>
                        <p id='email-address'>{props.user.email}</p>
                        <p className='updates'>Click Here to <span onClick={() => editViews()}>Change Email</span></p>
                        <p className='updates'>Click Here to <span onClick={() => passwordEditView()}>Update Password</span></p>
                        <button id='logout' onClick={() => logout()}>Logout</button>
                    </div>
                )}
                {!passwordEdit
                ? (
                    null
                ) : (
                    <section className='password-edit'>
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
            </div>
        )
    }


const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps, {getUser, clearUser})(Profile);
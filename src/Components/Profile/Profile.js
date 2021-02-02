import axios from 'axios';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getUser, clearUser} from '../../redux/reducer';

class Profile extends Component {
    constructor(props){
        super(props)
        this.state = {
            rentalHistory: [],
            editView: false,
            passwordEdit: false,
            email: '',
            verEmail: '',
            newPassword: '',
            verNewPassword: '',
            password: '',
            verPassword: '',
            adminEmail: '',
            adminPassword: '',
            verAdminPassword: '',
            admin: null,
        }
        
    }

    componentDidMount(){
        this.isAdmin();
        if(!this.props.user.email){
                this.props.history.push('/')
                alert('Plese login or register to view your')
        } else if (!this.state.admin){
            this.getRentalHistory();
        }
    }

    getRentalHistory = () => {
        axios.get(`/auth/history/${this.props.user_id}`)
        .then(res => {
            this.setState({rentalHistory: res.data})
        })
        .catch(err => console.log(err))
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

    updateEmail = () => {
        const {email, verEmail} = this.state;

        if(email && email === verEmail){
            return( 
                axios.put(`/auth/user/${this.props.user.user_id}`, {email: this.state.email})
                .then(res => {
                    this.props.getUser(res.data[0])
                    this.editView()
                    this.setState({email: '', verEmail: ''})
                })
                .catch(err => console.log(err))
            )
        }   
        return alert('Email addresses do not match')
    }

    updatePassword = () => {
        const {newPassword, verNewPassword} = this.state;

        if(newPassword && newPassword === verNewPassword){
            return(
                axios.put(`/auth/updatepassword/${this.props.user.user_id}`, {newPassword: newPassword})
                .then(res => {
                    this.props.getUser(res.data[0])
                    this.passwordEditView()
                    this.setState({newPassword: '', verNewPassword: ''})
                    alert('Password updated')
                })
                .catch(err => console.log(err))
            )
        } else {
            return alert('Passwords do not match')
        }
    }

    registerAdmin = () => {
        const {adminEmail, adminPassword, verAdminPassword} = this.state,
              isAdmin = true;

        if(adminPassword && adminPassword === verAdminPassword) {
            axios.post('/auth/registeradmin', {adminEmail, adminPassword, isAdmin})
            .then((res) => {
                console.log(res)
                alert('New Administrator Added')
            })
            .catch(err => {
                console.log(err)
                alert('Email already in use, please use another')
                this.setState({adminEmail: '', adminPassword: '', verAdminPassword: ''})
            })
        } else {
            alert('Passwords do not match')
        }
    }

    editView = () => {
        this.setState({editView: !this.state.editView})
    }

    passwordEditView = () => {
        this.setState({passwordEdit: !this.state.passwordEdit})
    }

    logout = () => {
        axios.get('auth/logout')
        .then(() => {
            this.props.clearUser()
            this.props.history.push('/')
        })
        .catch(err => console.log(err))
    }

    isAdmin = () => {
        this.setState({admin: this.props.user.admin})
    }

    render(){
        // console.log(this.props)
        return(
            <div>
                    {!this.state.admin ? (
                        <section>
                            <h3>Your Rental History</h3>
                            {this.state.rentalHistory.map(equipment => (
                                <div key={equipment.equipment_id}>
                                    <img src={equipment.equipment_picture} alt={equipment.name} />
                                    <p>{equipment.rental_date}</p>
                                    <p>{equipment.name}</p>
                                    <p>{equipment.equipment_description}</p>
                                </div>
                            ))}
                        </section>
                    ) : (
                        <section>
                            <h2>REGISTER NEW ADMINISTRATOR</h2>
                            <input
                                value={this.state.adminEmail}
                                name='adminEmail'
                                placeholder='New Administrator Email'
                                onChange={e => this.handleChange(e)} />
                            <input
                                value={this.state.adminPassword}
                                name='adminPassword'
                                placeholder='New Administrator Password'
                                type='password'
                                onChange={e => this.handleChange(e)} />
                            <input
                                value={this.state.verAdminPassword}
                                name='verAdminPassword'
                                placeholder='Verify Administrator Password'
                                type='password'
                                onChange={e => this.handleChange(e)} />
                            <button onClick={this.registerAdmin}>Register New Administrator</button>
                        </section>
                    )}
                <h3>Account Information</h3>
                {this.state.editView
                ? (
                    <div>
                        <h4>Change Email Address</h4>
                        <p>{this.props.user.email}</p>
                        <input
                                value={this.state.email}
                                name='email'
                                placeholder='New Email'
                                onChange={e => this.handleChange(e)} />
                        <input
                                value={this.state.verEmail}
                                name='verEmail'
                                placeholder='Confirm New Email'
                                onChange={e => this.handleChange(e)} />
                        <button onClick={this.updateEmail}>CONFIRM CHANGE</button>
                        <button onClick={this.editView}>BACK</button>
                    </div>
                ) : (
                    <div>
                        <h4>Account Email Address</h4>
                        <p>{this.props.user.email}</p>
                        <p>Click Here to <span onClick={this.editView}>Change Email</span></p>
                        <span onClick={this.passwordEditView}>Click Here to Update Password</span>
                    </div>
                )}
                {!this.state.passwordEdit
                ? (
                    null
                ) : (
                    <section>
                        <input
                            value={this.state.newPassword}
                            name='newPassword'
                            type='password'
                            placeholder='New Password'
                            onChange={e => this.handleChange(e)} />
                        <input
                            value={this.state.verNewPassword}
                            name='verNewPassword'
                            type='password'
                            placeholder='Confirm New Password'
                            onChange={e => this.handleChange(e)} />
                        <button onClick={this.updatePassword}>Update Password</button>
                    </section>
                )}
                <button onClick={this.logout}>Logout</button>
            </div>
        )
    }
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps, {getUser, clearUser})(Profile);
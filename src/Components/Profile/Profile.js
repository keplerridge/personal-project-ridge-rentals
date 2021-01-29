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
            email: '',
            verEmail: ''
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

    componentDidMount(){
        if(!this.props.user.email){
            this.props.history.push('/')
            alert('Plese login or register to view your profile')
        }
        this.getRentalHistory();
    }

    editView = () => {
        this.setState({editView: !this.state.editView})
    }

    logout = () => {
        axios.get('auth/logout')
        .then(() => {
            this.props.clearUser()
            this.props.history.push('/')
        })
        .catch(err => console.log(err))
    }

    render(){
        console.log(this.props);
        return(
            <div>
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
                <h3>Account Information</h3>
                {this.state.editView
                ? (
                    <div>
                        <h4>Change Email Address</h4>
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
                    </div>
                ) : (
                    <div>
                        <h4>Account Email Address</h4>
                        <p>{this.props.user.email}</p>
                        <p>Click Here to <span onClick={this.editView}>Change Email</span></p>
                        <span>Click Here to Update Password</span>
                    </div>
                )}
                <button onClick={this.logout}>Logout</button>
            </div>
        )
    }
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps, {getUser, clearUser})(Profile);
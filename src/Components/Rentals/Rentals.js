import {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {getUser} from '../../redux/reducer';

class Rentals extends Component {
    constructor(props){
        super(props)
        this.state = {
            equipment: [],
            name: '',
            description: '',
            image: ''
        }
    }
    componentDidMount(){
        this.getRentals();
    }

    getRentals = () => {
        axios.get(`/auth/rentals`)
        .then(res => {
            this.setState({equipment: res.data})
            console.log(res.data)
        })
        .catch(err => console.log(err))
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }
    
    addEquipment = () => {
        axios.post('/auth/newrental', {name: this.state.name, description: this.state.description, image: this.state.image})
        .then(() => {
            this.getRentals()
            this.setState({name: '', description: '', image: ''})
        })
        .catch(err => console.log(err))
    }

    render(){
        console.log(this.props)
        console.log(this.state.equipment)
        return(
            <section>
                {!this.props.user.admin
                    ? (
                         <section>
                            {this.state.equipment.map(equipment => (
                                <div key={equipment.equipment_id}>
                                    <img src ={equipment.equipment_picture} alt={equipment.name} />
                                    <p>{equipment.name}</p>
                                    <p>{equipment.equipment_description}</p>
                                </div>
                                ))}
                            </section> 
                    ) : (
                        <section>
                            <input
                                value={this.state.name}
                                placeholder='Equipment Name'
                                name='name'
                                onChange={e => this.handleChange(e)} />
                            <input
                                value={this.state.description}
                                placeholder='Equipment Description'
                                name='description'
                                onChange={e => this.handleChange(e)} />
                            <input
                                value={this.state.image}
                                placeholder='Equipment Image'
                                name='image'
                                onChange={e => this.handleChange(e)} />
                            <button onClick={this.addEquipment}>Add Equipment</button>
                            <section>
                                {this.state.equipment.map(equipment => (
                                <div key={equipment.equipment_id}>
                                    <img src ={equipment.equipment_picture} alt={equipment.name} />
                                    <p>{equipment.name}</p>
                                    <p>{equipment.equipment_description}</p>
                                </div>
                                ))}
                            </section> 
                        </section>
                    )}
            </section>
        )
    }
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps, {getUser})(Rentals);
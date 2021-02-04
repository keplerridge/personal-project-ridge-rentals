import {useState, useEffect} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {getUser} from '../../redux/reducer';

const Rentals = props => {
    const [equipment, setEquipment] = useState([]),
          [name, setName] = useState(''),
          [description, setDescription] = useState(''),
          [image, setImage] = useState('');

    useEffect(() => {
        getRentals();
    }, [])

    const getRentals = () => {
        axios.get(`/auth/rentals`)
        .then(res => {
            setEquipment(res.data)
            console.log(res.data)
        })
        .catch(err => console.log(err))
    }
    
    const addEquipment = () => {
        axios.post('/auth/newrental', {name: name, description: description, image: image})
        .then(() => {
            getRentals()
            setName('')
            setDescription('')
            setImage('')
        })
        .catch(err => console.log(err))
    }

        return(
            <section>
                {!props.user.admin
                    ? (
                         <section>
                            {equipment.map(equipment => (
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
                                value={name}
                                placeholder='Equipment Name'
                                onChange={e => setName(e.target.value)} />
                            <input
                                value={description}
                                placeholder='Equipment Description'
                                onChange={e => setDescription(e.target.value)} />
                            <input
                                value={image}
                                placeholder='Equipment Image'
                                name='image'
                                onChange={e => setImage(e.target.value)} />
                            <button onClick={() => addEquipment()}>Add Equipment</button>
                            <section>
                                {equipment.map(equipment => (
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


const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps, {getUser})(Rentals);
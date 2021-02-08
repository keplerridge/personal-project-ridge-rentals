import {useState, useEffect} from 'react';
import axios from 'axios';
import {v4 as randomString} from 'uuid';
import Dropzone from 'react-dropzone';
import {GridLoader} from 'react-spinners';
import {connect} from 'react-redux';
import {getUser} from '../../redux/reducer';

const Rentals = props => {
    const [equipment, setEquipment] = useState([]),
          [name, setName] = useState(''),
          [description, setDescription] = useState(''),
          [image, setImage] = useState(''),
          [isUploading, setIsUploading] = useState(false),
          [imgUrl, setImgUrl] = useState('');

    useEffect(() => {
        getRentals();
    }, [])

    const getSignedRequest = ([file]) => {
        console.log(file);
        setIsUploading(true);
        const fileName = `${randomString()}-${file.name.replace(/\s/g, '-')}`;

        axios
            .get('/auth/signs3', {
                params: {
                    'file-name': fileName,
                    'file-type': file.type,
                },
            })
            .then(res => {
                const {signedRequest, url} = res.data;
                setImgUrl(url)
                uploadFile(file, signedRequest, url);
            })
            .catch(err => {
                console.log(err)
            });
    }

    useEffect(() => {
        if(imgUrl){
            axios.post('/auth/newrental', {image: imgUrl,  description: description, name: name})
                    .then(() => {
                        getRentals()
                        setName('')
                        setDescription('')
                    }).catch(err => console.log(err))
        }
    }, [imgUrl])

    const uploadFile = (file, signedRequest, url) => {
        const options = {
            headers: {
                'Content-Type': file.type,
            },
        };

        axios
            .put(signedRequest, file, options)
            .then((res) => {
                setIsUploading(false)
            })
            .catch(err => {
                setIsUploading(false)
            if(err.response.status === 400){
                alert('Upload failed, check CORS configuration and bucket policy. Double check AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY')
            } else {
                alert(`ERROR: ${err.status} ${err.stack}`)
            }
        })
    }

    const getRentals = () => {
        axios.get(`/auth/rentals`)
        .then(res => {
            setEquipment(res.data)
            console.log(res.data)
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
                            <h1>Add New Equipment Here</h1>
                            <Dropzone
                                onDropAccepted={(file) => getSignedRequest(file)}
                                accept="image/*"
                                multiple={false}>
                                {({getRootProps, getInputProps}) => (
                                    <div 
                                        style = {{
                                        position: 'relative',
                                        width: 160,
                                        height: 80,
                                        borderWidth: 5,
                                        marginTop: 25,
                                        borderColor: 'gray',
                                        borderStyle: 'dashed',
                                        borderRadius: 5,
                                        display: 'inline-block',
                                        fontSize: 17,}}
                                        {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        {isUploading ? <GridLoader /> : <p>Drop files here, or click to select files</p>}
                                    </div>
                                )}
                            </Dropzone>
                            <input
                                value={name}
                                placeholder='Equipment Name'
                                onChange={e => setName(e.target.value)} />
                            <input
                                value={description}
                                placeholder='Equipment Description'
                                onChange={e => setDescription(e.target.value)} />
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
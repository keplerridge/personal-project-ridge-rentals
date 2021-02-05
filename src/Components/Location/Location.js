import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import './Location.css';

const Location = props => {

    return(
        <div className='location'>
            <section className='map-container'>
                <h1 id='map-header'>Here we are!</h1>
                <Map
                id='map'
                google={props.google}
                style={{width:'50%', height: '50%'}}
                zoom={10}
                center={{
                  lat: 33.43818,
                  lng: -111.79271
                }}>
                <Marker />
                </Map>
            </section>
            <section className='location-info'>
                <h1>Location</h1>
                <h4 id='info-sentence'>For equipment pickup, call ahead and pick up at</h4>
                <h4>480-201-3721</h4>
                <h4>1736 E Greenway St<br></br>Mesa AZ, 85203</h4>
            </section>
        </div>
    )
}

export default GoogleApiWrapper({apiKey:('AIzaSyCJPkP2zSgB7h-3ATvmcMyN3xQGaVs9qjQ')})(Location);
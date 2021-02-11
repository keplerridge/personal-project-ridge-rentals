import './Location.css';

const Location = props => {

    return(
        <div className='location'>
            <section className='map-container'>
                <h1 id='map-header'>Here we are!</h1>
                <iframe className='map' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.436240680256!2d-111.79538014867498!3d33.43793935720324!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x872ba6443b72181d%3A0xca3e0f6f669b1049!2s1736%20E%20Greenway%20St%2C%20Mesa%2C%20AZ%2085203!5e0!3m2!1sen!2sus!4v1612819602538!5m2!1sen!2sus" frameborder="0" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
            </section>
            <section className='location-info'>
                <h1>Location</h1>
                <h4 id='info-sentence'>For equipment pickup, call ahead to</h4>
                <h4>480-201-3721</h4>
                <h4 id='info-sentence'> and pick up at</h4>
                <h4>1736 E Greenway St<br></br>Mesa AZ, 85203</h4>
            </section>
        </div>
    )
}

export default Location;
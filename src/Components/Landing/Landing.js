import {Component} from 'react';
import './background.jpg'
import './Landing.css'

class Landing extends Component {
    render(){
        return(
            <div className='landing'>
                <article className='intro'>At   Ridge Rentals we strive to provide top of the line equipment in great condition. Our products are inspected and ready to go every time you make a reservation.</article>
            </div>
        )
    }
}

export default Landing;
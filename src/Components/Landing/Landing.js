import {Component} from 'react';
import Logo from './bobby.jpg';
import './Landing.css';

class Landing extends Component {
    render(){
        return(
            <div className='landing'>
                <article className='intro'>Bobby started Ridge Rentals as a way to provide quality equipment at a fair rate. Bobby uses this same equipment in his work as a contractor/owner of <a className='link' href='https://www.facebook.com/builtbyridge' target='_blank' rel='noreferrer'>Ridge Renovation and Construction</a> so it is always well maintined and ready for use.</article>
                <img id='image' src={Logo} alt='Company Owner' />
            </div>
        )
    }
}

export default Landing;
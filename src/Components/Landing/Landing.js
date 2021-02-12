require('dotenv').config();
import {Component} from 'react';
import Logo from './bobby.jpg';
import './Landing.css';
const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET, S3_BUCKET, AMAZON_ACCESS_KEY_ID, AMAZON_SECRET_ACCESS_KEY} = process.env;

class Landing extends Component {
    render(){
        return(
            <div className='landing'>
                <article className='intro'>Bobby started Ridge Rentals as a way to provide quality equipment at a fair rate. Bobby uses this same equipment in his work as a contractor/owner of <a className='link' href='https://www.facebook.com/builtbyridge' target='_blank' rel='noreferrer'>Ridge Renovation and Construction</a> so it is always well maintined and ready for use.</article>
                <img id='image' src={Logo} alt='Company Owner' />
                {console.log(`Server Port ${SERVER_PORT}, S3 Bucket ${S3_BUCKET}`)}
            </div>
        )
    }
}

export default Landing;
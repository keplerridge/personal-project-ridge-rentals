import './Contact.css';
import {useState} from 'react';
import axios from 'axios';

const Contact = () => {
    const [firstName, setFirstName] = useState(''),
          [lastName, setLastName] = useState(''),
          [email, setEmail] = useState(''),
          [subject, setSubject] = useState(''),
          [message, setMessage] = useState('');

const sendEmail = () => {
    axios.post('/auth/email', {firstName, lastName, subject, email, message})
    .then(() => {
        setFirstName('')
        setLastName('')
        setEmail('')
        setSubject('')
        setMessage('')
        alert('Message Sent!')
    })
    .catch(err => console.log(err))
}

    return(
            <div>
                {console.log(email)}
                <section>
                    <h2>To contact us, please call or email</h2>
                    <p>EMAIL: ridgerentals@gmail.com</p>
                    <p>PHONE: (XXX)XXX-XXXX</p>
                </section>
                <section>
                    <h2>You may also message us here and<br></br>we will get back to you as soon as possible</h2>
                    <form className='form'>
                        <label for='firstname'>First Name: </label>
                        <input value={firstName} type='text' onChange={e => setFirstName(e.target.value)} />
                        <label for='lastname'>Last Name: </label>
                        <input value={lastName} type='text' onChange={e => setLastName(e.target.value)} />
                        <label for='email'>Email: </label>
                        <input value={email} type='text' onChange={e => setEmail(e.target.value)} />
                        <label for='subject'>Subject: </label>
                        <input value={subject} type='text' onChange={e => setSubject(e.target.value)} />
                        <label for='message' >Message: </label>
                        <textarea value={message} id='message' type='text' onChange={e => setMessage(e.target.value)}></textarea>
                        <button onClick={() => sendEmail()}>Send Message</button>
                    </form>
                </section>
            </div>
        )
}

export default Contact;
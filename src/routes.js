import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Landing from './Components/Landing/Landing';
import Location from './Components/Location/Location';
import Contact from './Components/Contact/Contact';
import Profile from './Components/Profile/Profile';
import Rentals from './Components/Rentals/Rentals';
import Auth from './Components/Auth/Auth';

export default (
    <Switch>
        <Route exact path='/' component={Landing} />
        <Route path='/location' component={Location} />
        <Route path='/contact' component={Contact} />
        <Route path='/profile' component={Profile} />
        <Route path='/rentals' component={Rentals} />
        <Route path='/auth' component={Auth} />
    </Switch>
)
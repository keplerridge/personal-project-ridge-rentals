require('dotenv').config();
const express = require('express');
      app = express(),
      massive = require('massive'),
      session = require('express-session'),
      authCtrl = require('./controllers/authController'),
      mainCtrl = require('./controllers/mainController'),
      {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env;

app.use(express.json());
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {maxAge: 1000 * 60 * 60 * 24}
}));

massive({
    connectionString: CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false
    }
}).then(db => {
    app.set('db', db)
    app.listen(SERVER_PORT, () => console.log(`Listening on port ${SERVER_PORT}`))
    console.log('DB Connected')
})

//Authentication Endpoints
app.post('/auth/register', authCtrl.register);
app.post('/auth/login', authCtrl.login);
app.get('/auth/logout', authCtrl.logout);

//User Endpoints
app.put('/auth/user/:id', mainCtrl.updateEmail);
app.delete('/auth/user/:id', mainCtrl.delete);
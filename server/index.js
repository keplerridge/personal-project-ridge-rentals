require('dotenv').config();
const express = require('express'),
      app = express(),
      massive = require('massive'),
      session = require('express-session'),
      aws = require('aws-sdk'),
      authCtrl = require('./controllers/authController'),
      mainCtrl = require('./controllers/mainController'),
      emailCtrl = require('./controllers/emailController'),
      {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET, S3_BUCKET, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY} = process.env;

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

app.get('/auth/signs3', (req, res) => {
    aws.config = {
        region: 'us-west-1',
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY,
    };

const s3 = new aws.S3(),
      fileName = req.query['file-name'],
      fileType = req.query['file-type'],
      s3Params = {
          Bucket: S3_BUCKET,
          Key: fileName,
          Expires: 60,
          ContentType: fileType,
          ACL: 'public-read'
      }

s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if (err) {
        console.log(err);
        return res.end();
    }
    const returnData = {
        signedRequest: data,
        url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
    };
    return res.send(returnData)
  });
});

//Authentication Endpoints
app.post('/auth/register', authCtrl.register);
app.post('/auth/registeradmin', authCtrl.registerAdmin);
app.post('/auth/login', authCtrl.login);
app.get('/auth/logout', authCtrl.logout);

//User Endpoints
app.put('/auth/user/:id', mainCtrl.updateEmail);
app.delete('/auth/user/:id', mainCtrl.delete);
app.get('/auth/history/:id', mainCtrl.getRentalHistory);
app.put('/auth/updatepassword/:id', mainCtrl.updatePassword);

//Rentals
app.get('/auth/rentals', mainCtrl.getAllRentals);
app.post('/auth/newrental', mainCtrl.addToRentals);

//email
app.post('/auth/email', emailCtrl.sendEmail);
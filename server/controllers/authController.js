const bcrypt = require('bcryptjs');

module.exports = {
    register: async(req, res) => {
        const {email, password, admin} = req.body,
              db = req.app.get('db');

        const [founduser] = await db.users.check_user([email]);
        if(founduser){
            return res.status(400).send('Email already in use, please login or use another email address')
        }

        let salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        const [newUser] = await db.users.new_user([email, hash, admin])

        req.session.user = newUser;
        res.status(201).send(req.session.user);
    },
    registerAdmin: async(req, res) => {
        const {adminEmail, adminPassword, isAdmin} = req.body,
              db = req.app.get('db');

        const [founduser] = await db.users.check_user([adminEmail]);
        console.log(founduser)  
        if(founduser){
              return res.status(400).send('Email already in use')
          }
      
          let salt = bcrypt.genSaltSync(10);
          const hash = bcrypt.hashSync(adminPassword, salt);
      
          await db.users.add_new_admin([adminEmail, hash, isAdmin])
          res.sendStatus(202);
    },
    login: async(req, res) => {
        const {email, password} = req.body,
              db = req.app.get('db');

        const [foundUser] = await db.users.check_user([email]);
        if(!foundUser){
            return res.status(404).send('Email not registered, please create an account to continue')
        }

        const authenticated = bcrypt.compareSync(password, foundUser.password);
        if(!authenticated){
            return res.status(406).send('Incorrect email or password')
        }

        delete foundUser.password;
        req.session.user = foundUser;
        res.status(202).send(req.session.user);
    },
    logout: (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    }
}
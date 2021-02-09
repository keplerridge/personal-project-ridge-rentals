const bcrypt = require('bcryptjs');

module.exports = {
    updateEmail: (req, res) => {
        const {id} = req.params,
              {email} = req.body,
              db = req.app.get('db')

        db.users.update_email([email, id])
        .then(user => res.status(200).send(user))
        .catch(err => res.status(500).send(err))
    },
    updatePassword: (req, res) => {
        const {id} = req.params,
              {newPassword} = req.body,
              db = req.app.get('db');

        let salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(newPassword, salt)

        db.users.update_password([hash, id])
        .then(() => res.sendStatus(202))
        .catch(err => res.status(500).send(err))
    },
    delete: (req, res) => {
        const {id} = req.params,
              db = req.app.get('db');

        db.users.delete_user([id])
        .then(() => res.sendStatus(200))
        .catch(err => res.status(500).send(err));
    },
    getRentalHistory: (req, res) => {
        const {id} = req.params,
              db = req.app.get('db');

        db.rentalEquipment.rental_history(id)
        .then(history => res.status(200).send(history))
        .catch(err => res.status(500).send(err))
    },
    getAllRentals: (req, res) => {
        const db = req.app.get('db');

        db.rentalEquipment.get_all_equipment()
        .then(equipment => res.status(200).send(equipment))
        .catch(err => res.status(500).send(err))
    },
    addToRentals: (req, res) => {
        const {image, description, name} = req.body,
              db = req.app.get('db');

        db.rentalEquipment.add_equipment([image, description, name])
        .then(() => res.sendStatus(200))
        .catch(err => res.status(500).send(err))
    },
    addToRentalHistory: (req, res) => {
        const {userId, equipmentId} = req.body,
              db = req.app.get('db');

        db.rentalEquipment.add_to_history([userId, equipmentId])
        .then(() => res.sendStatus(200))
        .catch(err => res.status(500).send(err))
    }
}
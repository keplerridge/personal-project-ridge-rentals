module.exports = {
    updateEmail: (req, res) => {
        const {id} = req.params,
              {email} = req.body,
              db = req.app.get('db')

        db.users.update_email([email, id])
        .then(user => res.status(200).send(user))
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
    }
}
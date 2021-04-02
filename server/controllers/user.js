const bcrypt = require('bcryptjs')

module.exports = {
    register: async (req, res) => {
        const db = req.app.get('db')
        const { username, password } = req.body
        // Check if user already exists
        const existingUser = await db.user.find_user_by_username({username: username})
        if(existingUser[0]) {
            return res.status(400).send('Username already being used')
        }


        // Hash and salt the user password, and instert info into the db
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)
        const profile_pic = `https://robohash.org/${username}.png`

        const newUser = await db.user.create_user({username, hash, profile_pic})

        //Take the newly generated user, and place them on the session and send them to the client
        req.session.user = newUser[0]
        res.status(201).send(req.session.user)
    },

    login: async (req, res) => {
        const db = req.app.get('db')
        const { username, password } = req.body

        //Check if user exists
        const existingUser = await db.user.find_user_by_username({username})
        if(!existingUser[0]) {
            return res.status(404).send('User not found')
        }

        //Make sure password submitted matches the db hash
        const isAuthenticated = bcrypt.compareSync(password, existingUser[0].password)
        if(!isAuthenticated) {
            return res.status(401).send('Password is incorrect')
        }

        //Place user on session and send back to client
        req.session.user = existingUser[0]
        return res.status(202).send(req.session.user)
    },

    getUser: async (req, res) => {
        // Received help, be sure to study to ensure understanding.
        req.app.get('db').user.find_user_by_username(req.session.username)
        .then(user => res.status(200).send(user[0]))
    },

    logout: async (req, res) => {
        req.session.destroy()
        return res.sendStatus(200)
    }
}
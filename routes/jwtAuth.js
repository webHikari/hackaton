const router = require('express').Router();
const pool = require('../database/db');
const bcrypt = require('bcrypt');
const jwtGenerator = require('../utils/jwtGenerator');
const validinfo = require('../middleware/validinfo')
const authorization = require("../middleware/authorization")

router.post('/register', validinfo, async (req, res) => {
    try {
        // 1. destructure the req.body - name, email, password
        const { name, email, password } = req.body;

        // 2. check if user exist (if user exists then throw error)
        const user = await pool.query(
            'SELECT * FROM users WHERE user_name = $1',
            [email]
        );
        if (user.rows.length !== 0) {
            return res.status(401).send('User already exists');
        }

        // 3. bcrypt the user password
        const saltRound = 10;
        const genSalt = await bcrypt.genSalt(saltRound);
        const bcryptPassword = await bcrypt.hash(password, genSalt);

        // 4. enter the user inside our database
        const newUser = await pool.query(
            'INSERT INTO users (user_name, user_password) VALUES ($1, $2) RETURNING *',
            [username, password, bcryptPassword]
        );

        // 5. generate jwt token
        const token = jwtGenerator(newUser.rows[0].user_id);
        res.json({ token });
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

router.post('/login', validinfo, async (req, res) => {
    try {
        // 1. destructure the req.body
        const { username, password } = req.body;

        // 2. check if user doesn't exist (if not then we throw err)
        const user = await pool.query(
            'SELECT * FROM users WHERE user_name = $1',
            [username]
        );

        if (user.rows.length === 0) {
            return res.status(401).json('Username or password are incorrect');
        }

        // 3. check if incoming password is the same the database password
        const validPassword = await bcrypt.compare(
            password,
            user.rows[0].user_password
        );

        if (!validPassword) {
            return res.status(401).json('Password or username are incorrect');
        }

        // 4. give user the jwt token
        const token = jwtGenerator(user.rows[0].user_id);
        res.json({ token });
    } catch (err) {
        console.log(err);
    }
});

router.get("/is-verify", authorization, async (req, res) => {
    try {
        res.json(true)
    } catch (err) {
        console.log(err.message)
        res.status(500).send("Server Error")
    }
})

module.exports = router;

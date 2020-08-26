const router = require('express').Router();
const pool = require('../db');
const bcrypt = require('bcrypt');
const jwtGenerator = require('../util/jwtGenerator');
const validInfo = require('../middleware/validInfo');
const authorization = require('../middleware/authorization');
const { response } = require('express');

// Register Route
router.post('/register', validInfo, async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await pool.query('SELECT * FROM users WHERE user_email = $1', [
      email,
    ]);

    if (user.rows.length !== 0) {
      return res.status(401).json('User Already Exists!');
    }

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const bcryptPassword = await bcrypt.hash(password, salt);


    const newUser = await pool.query(
      'INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *',
      [name, email, bcryptPassword]
    );

    const token = jwtGenerator(newUser.rows[0].user_id)
    res.json({ token });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error!');
  }
});

// Login Route
router.post('/login', validInfo, async (req, res) => {
  try {
     const { email, password } = req.body;
     const user = await pool.query('SELECT * FROM users WHERE user_email = $1', [email]);
     
     if (user.rows.length === 0) {
       return res.status(401).json('Incorrect email or password!')
     };

     const validPassword = await bcrypt.compare(password, user.rows[0].user_password);

     if (!validPassword) {
       return status(401).json('Incorrect email or password!')
     };

     const token = jwtGenerator(user.rows[0].user_id);

     res.json({ token });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error!');
  }
});

router.get('/is-verify', authorization, (req, res) => {
  try {
    res.json(true)
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server Error!');
  }
})

module.exports = router;

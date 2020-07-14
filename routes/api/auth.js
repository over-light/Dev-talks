const express = require('express');
const router = express.Router()
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator')

const auth = require('../../middlewares/auth');
const User = require('../../models/User');

// @ route GET api/users
// @ get user details
// @access public

router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password')
        res.json(user)

    } catch (error) {
        console.log(error.message);
    }
})

// @ route POST api/auth
// @ login and get token
// @ access public
router.post('/', [
    check('email', 'invalid credentials').isEmail(),
    check('password', 'invalid credentials').isLength({ min: 6 })
],
    async (req, res) => {
        console.log("api hit");

        console.log(res.body);

        const errors = validationResult(req)
        // if there are errors
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() }) // send errors as an array in json format 
        }
        const { email, password } = req.body

        try {
            // check email
            let user = await User.findOne({ email }) // {email:email} ES6 :) 
            if (!user) {
                return res.status(400).json({ errors: [{ 'msg': 'email does not exist' }] })
            }

            // check password
            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) {
                return res.status(400).json({ errors: [{ 'msg': 'invalid credentials' }] })
            }

            // return JSONwebtoken
            const payload = {
                user: {
                    id: user.id
                }
            }
            jwt.sign(
                payload,
                config.get('jwtSecret'),
                { expiresIn: 360000 },
                (err, token) => {
                    if (err) throw err
                    res.json({ token })
                }
            )

        } catch (error) {
            console.log(error.message);
            res.status(400).send("server error")
        }
    })


module.exports = router
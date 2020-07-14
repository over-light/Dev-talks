const express = require('express');
const router = express.Router()
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator')

// get the DB User model
const User = require('../../models/User')

// @ route POST api/users
// @ desc  create user
// @access public
router.post('/', [
    check('name', 'name is required').not().isEmpty(),
    check('email', 'include a valid email').isEmail(),
    check('password', 'enter password 6 or more characters').isLength({ min: 6 })
],
    async (req, res) => {
        const errors = validationResult(req)
        // if there are errors
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() }) // send errors as an array in json format 
        }
        const { name, email, password } = req.body

        try {
            // see if user exists
            let user = await User.findOne({ email }) // {email:email} ES6 :) 
            if (user) {
                return res.status(400).json({ errors: [{ 'msg': 'user already exists' }] })
            }

            // get user gravatar
            const avatar = gravatar.url('email', {
                s: '200',
                r: 'pg',
                d: 'mm'
            })

            //create a new user ;it does not save in the db
            user = new User({
                name, // {name:name} ES6 :)
                email,
                password,
                avatar
            })

            // encrpyt password
            const salt = await bcrypt.genSalt(10)
            user.password = await bcrypt.hash(password, salt)
            await user.save() //every promise is depend on it's previous promise

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
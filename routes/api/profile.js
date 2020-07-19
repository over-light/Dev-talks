const express = require('express');
const router = express.Router()
const request = require('request');
const config = require('config');
const auth = require('../../middlewares/auth');
const Profile = require('../../models/Profile');
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');

// @ route GET api/profile/me
// @ desc get current user profile
// @ access Private

router.get('/me', auth, async (req, res) => {
    //! review
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar'])
        if (!profile)
            return res.status(400).send({ msg: "no profile exists for this user" })
        res.json(profile)
    } catch (error) {
        res.status(400).send({ msg: "server error" })

    }
})


// @ route POST api/profile
// @ desc create or update profile
// @ access Private

//? we can use multiple middlewre using array
router.post('/', [auth, [
    check('status', 'status is required').not().isEmpty(),
    check('skills', 'skills is required').not().isEmpty(),
]], async (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty())
        res.status(400).send({ errors: errors.array() })

    const { company, website, location, status, skills, bio, githubusername } = req.body

    const profileFields = {}
    profileFields.user = req.user.id
    if (company) profileFields.company = company
    if (website) profileFields.website = website
    if (location) profileFields.location = location
    if (status) profileFields.status = status
    if (bio) profileFields.bio = bio
    if (githubusername) profileFields.githubusername = githubusername
    if (skills) profileFields.skills = skills.split(',').map(skill => skill.trim())

    // # TODO  build social object 

    // find the profile and update it
    try {
        let profile = await Profile.findOne({ user: req.user.id })
        if (profile) {
            profile = await Profile.findOneAndUpdate(
                { user: req.user.id },
                { $set: profileFields },
                { new: true })
            return res.json(profile)
        }

        //if there is no profile ;CREATE
        profile = new Profile(profileFields)
        await profile.save()
        res.json(profile)

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ msg: "server error" })
    }
})

// @ route GET api/profile
// @ desc get all dev's profiles
// @ access Public

router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar'])
        res.json(profiles)
    }
    catch (error) {
        console.log(error.message);
    }
})

// @ route GET api/profile/user/:user_id
// @ desc get profile by user id
// @ access Public

router.get('/user/:user_id', async (req, res) => {
    try {
        console.log(req.params.user_id);
        const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'avatar'])
        if (!profile) return res.status(400).json({ msg: 'Profile not found' })
        res.json(profile)
    } catch (error) {
        console.log(error.message);
        if (error.kind == 'ObjectId')
            return res.status(400).json({ msg: 'Profile not found' })
        res.status(500).send('Server Error')
    }
})


// @ route DELETE api/profile/
// @ desc delete profile,user and it's posts
// @ access Private

router.delete('/', auth, async (req, res) => {
    try {
        // @TODO remove user's posts
        // delete profile
        await Profile.findOneAndRemove({ user: req.user.id })
        // delete user
        await User.findOneAndRemove({ _id: req.user.id })
        res.send("user deleted")
    } catch (error) {
        console.log(error.message);
        res.status(400).send("server fucked")
    }
})


// @ route PUT api/profile/experience
// @ desc add profile experience
// @ access Private
router.put('/experience', [auth, [
    check('title', 'Title is required').not().isEmpty(),
    check('company', 'Company is required').not().isEmpty(),
    check('from', 'From date is required').not().isEmpty(),
]],
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty())
            res.status(400).send({ errors: errors.array() })

        const { title, company, location, from, to, current, description } = req.body
        const newExp = { title, company, location, from, to, current, description }

        try {
            const profile = await Profile.findOne({ user: req.user.id })
            profile.experience.unshift(newExp)
            profile.save()
            res.json(profile)
        } catch (error) {
            console.error(error.message)
            res.send(500).send('Server error')
        }
    }
)

// @ route DELETE api/profile/experience/:exp_id
// @ desc delete profile experience
// @ access Private
router.delete('/experience/:exp_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });

        //Get remove Index
        const removeIndex = profile.experience
            .map(item => item.id)
            .indexOf(req.params.exp_id) // map will return an array of item.id then find the index
        profile.experience.splice(removeIndex, 1)
        await profile.save()
        res.json(profile)

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
})


// @ route PUT api/profile/eduaction
// @ desc add profile eduaction
// @ access Private
router.put('/education/', [auth, [
    check('school', 'School is required').not().isEmpty(),
    check('degree', 'Degree is required').not().isEmpty(),
    check('from', 'From date is required').not().isEmpty(),
    check('fieldofstudy', 'field of study is required').not().isEmpty(),
]],
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty())
            res.status(400).send({ errors: errors.array() })

        const { school, degree, fieldofstudy, from, to, current, description } = req.body
        const newEdu = { school, degree, fieldofstudy, from, to, current, description }

        try {
            const profile = await Profile.findOne({ user: req.user.id })
            profile.education.unshift(newEdu)
            profile.save()
            res.json(profile)
        } catch (error) {
            console.error(error.message)
            res.send(500).send('Server error')
        }
    }
)

// @ route DELETE api/profile/experience/:exp_id
// @ desc delete profile experience
// @ access Private
router.delete('/education/:edu_id/', auth, async (req, res) => {
    console.log("edu delete req");
    try {
        const profile = await Profile.findOne({ user: req.user.id });

        //Get remove Index
        const removeIndex = profile.education
            .map(item => item.id)
            .indexOf(req.params.edu_id) // map will return an array of item.id then find the index
        profile.education.splice(removeIndex, 1)
        await profile.save()
        res.json(profile)
        console.log(profile);

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server Error")
    }
})

// @ route GET api/profile/github/:username
// @ desc get user repos from gitrhub
// @ access Public

router.get('/github/:username', (req, res) => {
    try {
        const options = {
            uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&
            sort=created:asc&client_id=${config.get('githubClientId')}&client_secret=
            ${config.get('githubSecret')}`,
            method: 'GET',
            headers: { 'user-agent': 'node.js' }
        }

        request(options, (error, response, body) => {
            if (error)
                console.log(error);
            if (response.statusCode !== 200) {
                res.status(400).json({ msg: 'No github profile found' })
            }
            res.send(JSON.parse(body))
        })

    } catch (error) {
        console.log(error.message);
        res.status(500).send('server error')
    }
})



module.exports = router
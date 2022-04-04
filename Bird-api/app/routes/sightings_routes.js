// import our dependecies, middleware and models 
const express = require('express')
const passport = require('passport')

// pull in our model
const Sightings = require('../models/')

// helps us detect certain situations and send custom errors
const customErrors = require('../../lib/custom_errors')
// this function sends a 404 when non-existent document is requested
const handle404 = customErrors.handle404
// middleware that can send a 401 when a user tries to access something they do not own
const requireOwnership = customErrors.requireOwnership
// requireToken is passed as a second arg to router.<verb> 
// makes it so that a token MUST be passed for that route to be available --> also sets 'req.user'
const requireToken = passport.authenticate('bearer', { session: false })
// this middleware removes any blank fields from req.body
const removeBlanks = require('../../lib/remove_blank_fields')

// instantiate our router
const router = express.Router()

// ROUTES GO HERE

// INDEX ROUTE
router.get('/sightings', (req, res, next) => {
    Sightings.find()
        .populate('owner')
        .then(sightings => {
            return sightings.map(sightings => sightings.toObject())
        })
        .then(sightings => res.status(200).json({ sightings }))
        .catch(next)
})


// keep at bottom of file
module.exports = router
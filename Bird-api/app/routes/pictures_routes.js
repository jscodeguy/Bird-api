// import our dependecies, middleware and models 
const express = require('express')
const passport = require('passport')
const Sightings = require('../models/pet')
const customErrors = require('../../lib/custom_errors')

const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const requireToken = passport.authenticate('bearer', { session: false })
const removeBlanks = require('../../lib/remove_blank_fields')

const router = express.Router()

// ROUTES GO HERE

// POST -> upload a pic
router.post('/pictures/:id', removeBlanks, (req, res, next) => {
    // get our pic from req.body
    const pic = req.body.pic
    // get our sightingId from req.params.id
    const sightingId = req.params.id
    // find the pic
    Sighting.findById(sightingId)
        // handle what happens if no pic is found
        .then(handle404)
        .then(sighting => {
            // push the pic to the pic array
            sighting.pics.push(pic)

            // save the sighting
            return sighting.save()
        })
        // then we send the sighting as json
        .then(sighting => res.status(201).json({ sighting: sighting }))
        // catch errors and send to the handler
        .catch(next)
})

// UPDATE
// PATCH /toys/<pet_id>/<toy_id>
router.patch('/pictures/:id/:picId', requireToken, removeBlanks, (req, res, next) => {
    const picId = req.params.picId
    const sightingId = req.params.id

    Sighting.findById(sightingId)
        .then(handle404)
        .then(sighting => {
            const thePic = sighting.pics.id(picId)
            console.log('the pic id', picId)
            console.log('this is the original pic', thePic)
            requireOwnership(req, sighting)

            thePic.set(req.body.pic)

            return sighting.save()
        })
        .then(() => res.sendStatus(204))
        .catch(next)
})

// DELETE -> delete a picture
router.delete('/pictures/:id/:picId', requireToken, (req, res, next) => {
    // saving both ids to variables for easy ref later
    const picId = req.params.picId
    const sightingId = req.params.id
    // find the sighting in the db
    Sighting.findById(sightingId)
        // if sighting not found throw 404
        .then(handle404)
        .then(sighting => {
            // get the specific subdocument by its id
            const thePic = sighting.pics.id(picId)
            // require that the deleter is the owner of the sighting
            requireOwnership(req, sighting)
            // call remove on the picture we got on the line above requireOwnership
            thePic.remove()

            // return the saved sighting
            return sighting.save()
        })
        // send 204 no content
        .then(() => res.sendStatus(204))
        .catch(next)
})

module.exports = router
// import our dependecies, middleware and models 
const express = require('express')
const passport = require('passport')

// pull in our model
const Sighting = require('../models/sighting')

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
router.get("/sightings", requireToken, (req, res, next) => {
	Sighting.find()
		.then((sightings) => {
			// "sightings" will be an array of Mongoose documents.
			// We want to convert each one to a POJO, so we use ".map" to
			// apply ".toObject" to each one
			return sightings.map((sighting) => sighting.toObject())
		})
		// respond with status 200 and JSON of the sightings
		.then((sightings) => res.status(200).json({ sightings: sightings }))
		// if an error occurs, pass it to the handler
		.catch(next)
})

// SHOW
// GET /sightings/5a7db6c74d55bc51bdf39793
router.get("/sightings/:id", requireToken, (req, res, next) => {
	// req.params.id will be set based on the ":id" in the route
	Sighting.findById(req.params.id)
		.then(handle404)
		// if "findById" is succesful, respond with 200 and sighting JSON
		.then((sighting) => res.status(200).json({ sighting: sighting.toObject() }))
		// if an error occurs, pass it to the handler
		.catch(next)
})

// CREATE
// POST /sightings
router.post("/sightings", requireToken, (req, res, next) => {
	// set owner of new sighting to be current user
	req.body.sighting.owner = req.user.id

	Sighting.create(req.body.sighting)
		// respond to succesful "create" with status 201 and JSON of new sighting
		.then((sighting) => {
			res.status(201).json({ sighting: sighting.toObject() })
		})
		// if an error occurs, pass it off to our error handler
		// the error handler needs the error message and the `res` object so that it
		// can send an error message back to the client
		.catch(next)
})

// UPDATE
// PATCH /sightings/5a7db6c74d55bc51bdf39793
router.patch("/sightings/:id", requireToken, removeBlanks, (req, res, next) => {
	// if the client attempts to change the "owner" property by including a new
	// owner, prevent that by deleting that key/value pair
	delete req.body.sighting.owner

    Sighting.findById(req.params.id)
		.then(handle404)
		.then((sighting) => {
			// pass the "req" object and the Mongoose record to "requireOwnership"
			// it will throw an error if the current user isn't the owner
			requireOwnership(req, sighting)

			// pass the result of Mongoose"s ".update" to the next ".then"
			return sighting.updateOne(req.body.sighting)
		})
		// if that succeeded, return 204 and no JSON
		.then(() => res.sendStatus(204))
		// if an error occurs, pass it to the handler
		.catch(next)
})

// DESTROY
// DELETE /sighting/5a7db6c74d55bc51bdf39793
router.delete("/sightings/:id", requireToken, (req, res, next) => {
	Sighting.findById(req.params.id)
		.then(handle404)
		.then((sighting) => {
			// throw an error if current user doesn't own "sighting"
			requireOwnership(req, sighting)
			// delete the sighting ONLY IF the above didn't throw
			sighting.deleteOne()
		})
		// send back 204 and no content if the deletion succeeded
		.then(() => res.sendStatus(204))
		// if an error occurs, pass it to the handler
		.catch(next)
})


// keep at bottom of file
module.exports = router
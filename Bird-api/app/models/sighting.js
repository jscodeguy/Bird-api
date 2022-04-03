const mongoose = require("mongoose")

const { Schema, model } = mongoose

const sightingSchema = new Schema(
	{
		where_seen: {
			type: String,
			required: true,
		},
		when_seen: {
			type: Date,
            required: true,
		},
        weather: {
            type: String,
            enum: ["sun", "overcast", "rain", "snow"],
            required: true,
        },
        description: {
            type: String,
            requried: true
        },
        owner: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
        pics: {
			type: Schema.Types.ObjectId,
			ref: "Pictures",
		},
        bird: {
            type: String,
            required: true,
        }
	},
	{
		timestamps: true,
	}
)

module.exports = model("Sightings", sightingSchema)

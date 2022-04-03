const mongoose = require("mongoose")

const { Schema, model } = mongoose

const picsSchema = new Schema(
	{
		source: {
			type: String,
			required: true,
		},
        description: {
            type: String,
            required: true,
        },
		owner: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
        notes: {
			type: Schema.Types.ObjectId,
			ref: "Comment",
		},
        bird: {
            // ID to be captured from the API
            type: String,
            required: true,
        }
	},
	{
		timestamps: true,
	}
)

module.exports = model("Pictures", picsSchema)

const mongoose = require("mongoose")

const { Schema, model } = mongoose

const favsSchema = new Schema(
	{
		haveSeen: {
			type: Boolean,
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
        pics: {
            type: Schema.Types.ObjectId,
            ref: "Pictures"
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

module.exports = model("Favorites", favsSchema)

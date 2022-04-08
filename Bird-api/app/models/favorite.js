// Import dependencies
const mongoose = require("mongoose")
const { Schema, model } = mongoose
const commentSchema = require("./comment")
const User = require("./user")

const favSchema = new Schema(
	{
		haveSeen: {
			type: Boolean,
			required: true,
		},
		owner: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
        pics: {
            type: Schema.Types.ObjectId,
            ref: "Pictures"
        },
        bird: {
            type: String,
            required: true,
        },
		comments: [commentSchema]
	},
	{
		timestamps: true,
	}
)

module.exports = model("Favorite", favSchema)

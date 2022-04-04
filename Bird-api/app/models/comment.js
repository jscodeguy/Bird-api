const mongoose = require("mongoose")

const Schema = mongoose

// Since comments is a subdocument of user, we don't need a model, just a schema.
const commentSchema = new Schema(
    {
        body: {
            type: String,
            required: true
        },
        topic: {
            type: String,
            required: true
        },
        author: {
            type: Schema.Types.ObjectID,
            ref: 'User',
            required: true
        }
    },
    {
        timestamps: true
    }
)

module.exports = commentSchema

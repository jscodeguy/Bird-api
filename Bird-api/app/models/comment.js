const mongoose = require("mongoose")
const { Schema } = mongoose

// Since comments is a subdocument of user, we don't need a model, just a schema.
const commentSchema = new Schema(
    {
        note: {
            type: String,
            required: true
        },
        author: {
            type: Schema.Types.ObjectID,
            ref: "User",
            required: true
        }
    },{
        timestamps: true
    }
)

module.exports = commentSchema

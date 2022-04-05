const mongoose = require("mongoose")

const Schema = mongoose

// Since comments is a subdocument of user, we don't need a model, just a schema.
const commentSchema = new Schema(
    {
        note: {
            type: String,
            required: true
        },
        // topic: {
        //     // Need to figure out how to separate comments from pics vs comments from favs
        //     // Probably a conditional in the schema, but need to see how that information is coming across first
        //     // REF: https://www.liquid-technologies.com/Reference/XmlStudio/JsonEditorNotation_IfThenElse.html
        //     // type: Schema.Types.ObjectID,
        //     // ref: "",
        //     // required: true
        // },
        author: {
            type: Schema.Types.ObjectID,
            ref: "User",
            required: true
        }
    },
    {
        timestamps: true
    }
)

module.exports = commentSchema

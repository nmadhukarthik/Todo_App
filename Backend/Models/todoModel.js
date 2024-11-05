import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    title:
    {
        type: String,
        required: true
    },

    date:
    {
        type: String,
        required: true
    },

    completed:
    {
        type: Boolean,
        required: true
    },
    user:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userSchemaModal", // referencing userSchemaModal to connect to users collection in MongoDB
        required: true
    }
})

const todoSchemaModel = mongoose.model("Todo", todoSchema)

export default todoSchemaModel

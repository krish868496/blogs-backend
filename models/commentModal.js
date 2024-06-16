const mongoose = require("mongoose")

// route handler 
const commentSchema = new mongoose.Schema({
        post: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Post", // this is refernece to the post modal
        },
        user:{
                type: String, 
                required: true
        }, 
        body:{
                type: String,
                required: true,
        }
})

module.exports = mongoose.model("Comment", commentSchema)
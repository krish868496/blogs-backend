const Post = require('../models/postModal')
const Comment = require("../models/commentModal")


// business logic 

exports.createComment = async (req, res) => {
        try {
                // fetch data 
                const { post, user, body } = req.body;
                // create comment object
                const comment = new Comment({
                        post, user, body
                })
                // save the comment into database 
                const savedComment = await comment.save();

                console.log(savedComment);


                // find the post using id and update the comment to comment in comment array
                const updatedPost = await Post.findByIdAndUpdate(post, { $push: {comments: savedComment._id} }, { new: true })
                        .populate("comments").exec(); //poupulate the comment array with comment documents 
                        console.log(updatedPost);
                res.status(200).json({
                        post: updatedPost,
                        message: "Comment updated successfully",
                        status: "true"

                })


        } catch (error) {
                return res.status(500).json({
                        error: "Error While Creating Comments"
                })
        }
}

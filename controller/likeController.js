const Post = require("../models/postModal")
const Like = require("../models/likeModal")

// post like 
exports.likes = async (req, res) => {
        try {
                // fetch post and user from req's body 
                const { post, user } = req.body;
                // create like object 
                const like = new Like({
                        post, user
                })
                // save the object 
                const savedLike = await like.save();
                // find the post by id and update to its like array 
                const updatedPost = await Post.findByIdAndUpdate(post, { $push: { likes: savedLike._id } }, { new: true }).populate("likes").exec();

                res.json({
                        post: updatedPost,
                        message: "Post liked successfully",
                        status: "true"
                })

        } catch (error) {
                console.log(error);
                res.status(500).json({
                        error: "Internal server error"
                })
        }
}


//  dislike post 

exports.disLikes = async (req, res) => {

        try {
                // extract post id and like id from req ki body 
                const { post, like } = req.body;
                // console.log("post", post, like);
                // delete from like collection and post collection 
                const deleteLike = await Like.findOneAndDelete({ post: post, _id: like })
                // update the post collection 
                const updatedPost = await Post.findByIdAndUpdate(post, { $pull: { likes: deleteLike._id } }, { new: true })
                // .populate("likes").exec()
                res.json({
                        post: updatedPost,
                        message: "Post disliked successfully",
                        status: "true"
                })

        } catch (error) {
                console.log(error);
                res.status(500).json({
                        error: "Getting an error while posting Dislike"
                })
        }
}
const Post = require("../models/postModal")

exports.createPost = async (req, res) => {
        try {
                // Extract title and body from the request body
                const { title, body } = req.body;

                // Create the post
                const savedPost = await Post.create({ title, body });

                // Retrieve the saved post and populate comments
                const populatedPost = await Post.findById(savedPost._id)
                        .populate('comments').exec();

                console.log(populatedPost, "post");

                res.json({
                        post: populatedPost,
                        message: "Post created successfully",
                        status: "true"
                });
        } catch (error) {
                console.log(error);
                return res.status(500).json({
                        error: "Internal server error",
                });
        }
};


// get all posts 
exports.getAllPosts = async (req, res) => {
        try {
                const posts = await Post.find({})
                        .populate("comments")
                        .populate("likes").exec()
                console.log(posts, "posts");
                res.json({
                        posts
                })
        } catch (error) {
                console.log(error);
                return res.status(500).json({
                        error: "Internal server error"
                })
        }
}
// get post
exports.getPost = async (req, res) => {
        try {
                const { id } = req.params;
                const post = await Post.findById(id)
                        .populate("comments")
                        .populate("likes").exec()
                if (!post) {
                        return res.status(404).json({
                                error: "Post not found"
                        })
                }
                res.status(200).json({
                        post: post
                })
        } catch (error) {
                console.log(error);
                return res.status(500).json({
                        error: "Internal server error"
                })
        }
}
// delete post 

exports.deletePost = async (req, res) => {
        try {
                const { id } = req.params;
                console.log(id, "delete");
                const post = await Post.findByIdAndDelete(id)
                if (!post) {
                        return res.status(404).json({
                                error: "Post not found"
                        })
                }
                res.status(200).json({
                        post: post,
                        message: "Post deleted successfully",
                        status: "true"
                })
        } catch (error) {
                console.log(error);
                return res.status(500).json({
                        error: "Internal server error"
                })
        }
}

// update post 
exports.updatePost = async (req, res) => {
        try {
                const { id } = req.query;
                console.log(id);
                const { title, body } = req.body;
                const updatedPost = await Post.findByIdAndUpdate({ _id: id }, { title: title, body: body })
                console.log(updatedPost, "post");
                res.status(200).json({
                        post: updatedPost,
                        message: "Post updated successfully",
                        status: "true"
                })
        } catch (error) {
                res.status(500).json({
                        error: "Internal server error",
                        status: "false",
                        message: "Error while updating post"
                })

        }

}

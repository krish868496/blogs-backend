const express = require("express")
const router = express.Router();



// import controller 
const {likes, disLikes} = require("../controller/likeController")
const {createComment} = require("../controller/commentController")
const {createPost, getPost, getAllPosts, deletePost, updatePost} = require('../controller/postController')
router.get('/dummyroute', (req, res) => {
        res.send("hello bhai ji kunal")
})
router.post('/comments/create', createComment)
router.post('/posts/create', createPost)
router.get('/posts', getAllPosts)
router.get('/post/:id', getPost)
router.post('/likes/like', likes)
router.post('/likes/disLike', disLikes)
router.delete('/post/deletePost/:id', deletePost)
router.patch('/post/updatePost', updatePost)



module.exports = router;

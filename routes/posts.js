import express from 'express';
import bcrypt from 'bcrypt';
import Post from '../models/post.js';

const router = express.Router();

router.get('/',async (req, res) => {

    // let { page, limit } = req.query;

    // const startIndex = (page - 1) * limit;
    // const endIndex = page * limit

    try{
        const posts = await Post.find();
        // const filteredPosts = posts.slice(startIndex, endIndex);
        // res.json({filteredPosts, max: posts.length})
        res.json(posts);
    }
    catch(err){
        res.status(500).json({message: err.message})
        console.error(err)
    }
});

router.post('/', async (req, res) => {

    let post = new Post({
        username: req.body.username,
        content: req.body.content,
    })
    
    try{
        const newPost = await post.save();
        res.status(200).json({message: 'success'});
    }
    catch(err){
        console.log(err);
        res.json({message: err.message})
    }
});

// upload a comment
router.post('/comment', async(req, res) => {
    const { postid, QueryUsername } = req.query;
    try{
        let post = await Post.findOne({_id: postid});
        post.comments.push({
            username: QueryUsername,
            comment: req.body.comment,
        })
        await post.save();
        res.json({message: 'success'});
    } 
    catch(err) {
        console.error(err);
        res.json({message: 'server error'})
    }
})

router.patch('/onlike', async (req, res) => {
    const {postid, userid} = req.query;
    try{
        const post = await Post.findOne({_id : postid});
        if(post.userWhoLikedThis.find(user => user === userid)){
            post.likes = post.likes - 1;
            await post.save();
            res.status(200).json({message: 'success'})
            const postToUpdate = await Post.findByIdAndUpdate({_id: postid},{
              $pull:{
                userWhoLikedThis: userid
              }  
            })
            await postToUpdate.save();
        }
        else{
            post.likes = post.likes + 1;
            await post.save();
            res.status(200).json({message: 'success'})
            const postToUpdate = await Post.findByIdAndUpdate({_id: postid},{
              $push:{
                userWhoLikedThis: userid
              }  
            })
            await postToUpdate.save();
        }
    }
    catch(err) {
        console.error(err);
        res.json({message: err.message});
    }

});

router.get('/getlikes',async (req, res)=>{
    const { postid } = req.query;
    try {
        let post = await Post.findOne({_id: postid});
        if(!post){
            return res.json({message: 'deleted'});
        }
        return res.json({
            data: post,
            message: 'found'
        })
    }
    catch (err) {
        console.error(err);
        return res.json({message: 'this post was deleted'});
    }
     
});

router.get('/getcomments',async (req, res)=>{
    const { postid } = req.query;
    try {
        let post = await Post.findOne({_id: postid});
        if(!post){
            return res.json({message: 'deleted'});
        }
        return res.json({
            data: post,
            message: 'found'
        })
    }
    catch (err) {
        console.error(err);
        return res.json({message: 'this post was deleted'});
    }
     
});

router.get('/:user', async (req, res) => {
    const { user } = req.params;

    try{
        let posts = await Post.find({ username: user });
        res.json(posts);
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
});

router.delete('/:postid', async (req, res) => {
    const { postid } = req.params;
    try{
        await Post.deleteOne({_id: postid});
        res.json({message: 'success'});
    }
    catch(err){
        console.log(err);
        res.json({message: err.message});
    }
})

export default router;
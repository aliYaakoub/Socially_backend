import express from 'express';
import bcrypt from 'bcrypt';
import AdminPost from '../models/adminPost.js';

const router = express.Router();

router.get('/', async (req,res)=>{
    try{
        let posts = await AdminPost.find();
        res.json(posts);
    }
    catch(err){
        console.error(err.message);
    }
});

router.post('/', async (req, res)=>{
    try{
        let newPost = await AdminPost({
            username: req.body.username,
            content: req.body.content
        })
        await newPost.save();
        res.json({message: 'success'})
    }
    catch(err){
        console.error(err.message);
        res.json({message: 'server error'})
    }
})

router.delete('/:postId', async (req, res) => {
    const { postId } = req.params;
    try{
        let post = await AdminPost.findByIdAndDelete(postId)
        res.json({message: 'deleted'})
    }
    catch(err){
        console.error(err.message);
        res.json({message: 'server error'})
    }
})

export default router;
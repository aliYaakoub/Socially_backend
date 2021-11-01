import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/user.js';

const router = express.Router();


router.get('/', async (req, res) => {
    try{
        const users = await User.find()
        res.send({
            data: users,
            message: 'success'
        })
    }
    catch(err){
        res.status(500).json({message: err.message})
        console.error(err)
    }
})
router.delete('/deleteUser/:userId', async (req, res) => {
    const {userId} = req.params;
    try{
        const user = await User.findByIdAndDelete(userId);
        res.json({message: 'deleted'})
    }
    catch(err) {
        console.error(err.message);
        res.json({message: 'server error'})
    }
});

router.get('/user', async (req, res) => {
    const { userN } = req.query;
    try{
        const user = await User.findOne({username: userN});
        res.json(user);
    }
    catch(err) {
        console.log(err);
        res.json({message: err.message});
    }
});

// /users/register
router.post('/register',async (req, res) => {

    const { name, username, email, password } = req.query;
    
    let account = new User({
        name: name,
        username: username,
        email: email,
        password: password
    });

    const salt = await bcrypt.genSalt(10);
    account.password = await bcrypt.hash(account.password, salt);
    
    try{
        const newAccount = await account.save();
        res.status(200).json({message: 'success'});
    }
    catch(err){
        
        let CheckUsername = await User.findOne({username:username});
        if(CheckUsername){
            return res.json({message : 'username already exist'});
            
        }

        let CheckEmail = await User.findOne({email:email});
        if(CheckEmail){
            return res.json({message : 'email already registered'});
            
        }
        console.log(err);
        res.json({message: err.message})
    }
})

// /users/login
router.get('/login', async (req, res) => {

    const { email, password } = req.query;

    let account = await User.findOne({email: email});
    if(!account){
        return res.json({message: 'incorrect email or password'});
    }

    const validPassword = await bcrypt.compare(password, account.password);
    if(!validPassword) {
        return res.json({message: 'incorrect email or password'});
    }

    res.status(200).json({message: 'welcome', isAdmin: account.isAdmin, userId: account._id, username: account.username})

});

export default router;
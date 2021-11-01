import mongoose from "mongoose";

const post = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 1000
    },
    comments:[{
        username:String,
        comment:{
            type: String,
            maxlength: 200,
            required: true
        }
    }],
    likes: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now
    },
    userWhoLikedThis: [String]
});

export default mongoose.model('Post', post);
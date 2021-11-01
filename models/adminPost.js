import mongoose from "mongoose";

const adminPost = new mongoose.Schema({
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
    date: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('AdminPost', adminPost);
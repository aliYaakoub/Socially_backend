import mongoose from "mongoose";

const user = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlenght: 5,
        maxlenght: 20
    },
    username: {
        type: String,
        required: true,
        minlength:5,
        maxlength:15,
        unique: true
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique:true
    },
    password : {
        type : String,
        required : true,
        minlength : 5,
        maxlength : 255
    },
    isAdmin:{
        type: Boolean,
        default: false
    }
});

export default mongoose.model('User', user)
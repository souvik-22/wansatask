const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type:String,
        required:true,
        unique:[true, "Username already present"],
    },
    password: {
        type:String,
        required:true,
    }
});

const User = new mongoose.model("User",userSchema);

module.exports = User;
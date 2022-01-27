const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    username: {
        type:String,
        required:true,
    },
    name: {
        type:String,
        required:true,
    },
    description: {
        type:String,
        required:true,
    },
});

const Todo = new mongoose.model("Todo",todoSchema);

module.exports = Todo;
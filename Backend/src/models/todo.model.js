const { default: mongoose } = require("mongoose");
const mogoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true, //removes extra spaces
  },
  completed: {
    type: Boolean,
    deafult: false,
  },
});

const todoSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  heading: {
    type: String,
    required: true,
    trim: true,
  },
  tasks: [taskSchema],
});

const todoModel = mongoose.model("todo", todoSchema)

module.exports = todoModel

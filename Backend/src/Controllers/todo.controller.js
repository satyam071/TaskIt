const todoModel = require("../models/todo.model");
const jwt = require("jsonwebtoken");

async function postTodo(req, res) {
  const { heading, tasks } = req.body;
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "No token found" });
  }

  if (!heading) {
    return res.status(401).json({ message: "Heading required" });
  } else if (!tasks) {
    return res.status(401).json({ message: "Tasks required" });
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  req.user = decoded;
  const list = await todoModel.create({
    user: req.user.id,
    heading,
    tasks,
  });

  return res.status(201).json({
    message: "todo created successfully",
    list,
  });
}

async function getAllTodos(req, res) {
  try {
    const token = req.cookies.token;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    const todos = await todoModel.find({
      user: req.user.id,
    });

    return res.status(200).json({
      message: "Todos successfully fetched",
      todos,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Failed to fetch todos",
      err: err.message,
    });
  }
}

async function getTodoByHeading(req, res) {
  const { headingId } = req.params;
  if (!headingId) {
    return res.status(401).json({
      message: "Invalid Heading Id",
    });
  }
  try {
    const todos = await todoModel.findById(headingId);
    return res.status(201).json({
      message: "Todo list fetched successfully",
      todos,
    });
  } catch (error) {
    return res.status(401).json({
      message: "Forbidden",
      error: error.message,
    });
  }
}

async function updateTodoByHeading(req, res) {
  const { headingId } = req.params;

  if (!headingId) {
    return res.status(401).json({
      message: "Invalid Heading Id",
    });
  }

  try {
    const todo = await todoModel.findByIdAndUpdate(headingId, req.body, {
      new: true,
      runValidators: true,
    });

    if (!todo) {
      return res.status(401).json({
        message: "Invalid Heading Id",
      });
    }

    return res.status(201).json({
      message: "Todo updated successfully",
      todo,
    });
  } catch (error) {
    return res.status(401).json({
      message: "Forbidden",
      error: error.message,
    });
  }
}

async function deleteTodo(req, res) {
  const { headingId } = req.params;

  if (!headingId) {
    return res.status(201).json({
      message: "No heading Id found",
    });
  }
  try {
    const todo = await todoModel.findByIdAndDelete(headingId);
    if (!todo) {
      return res.status(401).json({
        message: "Todo not found",
      });
    }

    return res.status(201).json({
      message: "Todo successfully deleted",
    });
  } catch (error) {
    return res.status(401).json({
      message: "Forbidden",
      error: error.message,
    });
  }
}

async function postTasks(req, res) {
  const { headingId } = req.params;
  const { tasks } = req.body;

  if (!headingId) {
    return res.status(400).json({
      message: "No Heading Found",
    });
  }
  try {
    const todo = await todoModel.findByIdAndUpdate(
      headingId,
      {
        $push: {
          tasks: {
            $each: tasks,
          },
        },
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!todo) {
      return res.status(401).json({
        message: "Could not found Heading Id",
      });
    }

    return res.status(201).json({
      message: "Tasks Updated successfully",
      todo,
    });
  } catch (error) {
    return res.status(401).json({
      message: "Forbidden",
    });
  }
}

async function updateTask(req, res) {
  const { headingId, taskId } = req.params;

  if (!headingId || !taskId) {
    return res.status(401).json({
      message: "Missing Items",
    });
  }

  try {
    const todo = await todoModel.findOneAndUpdate(
      {
        _id: headingId,
        "tasks._id": taskId,
      },
      {
        $set: {
          "tasks.$.title": req.body.title,
        },
      },
      {
        new: true,
        runValidators: true,
      },
    );

    return res.status(201).json({
      message: "Tasks Updated Successfully",
      todo,
    });
  } catch (error) {
    return res.status(401).json({
      message: "Forbidden",
      headingId,
      taskId,
    });
  }
}

async function updateStatus(req, res) {
  const { headingId, taskId } = req.params;
  if (!headingId || !taskId) {
    return res.status(401).json({
      message: "IDs not found ",
      headingId,
      taskId,
    });
  }

  try {
    const todo = await todoModel.findOneAndUpdate(
      {
        _id: headingId,
        "tasks._id": taskId,
      },
      {
        $set: {
          "tasks.$.completed": req.body.status,
        },
      },
      {
        new: true,
        runValidators: true,
      },
    );
    if (!todo) {
      return res.status(404).json({
        message: "Todo or task not found",
      });
    }
    return res.status(201).json({
      message: "Status Updated Successfully",
      todo,
    });
  } catch (error) {
    return res.status(401).json({
      message: "Forbidden",
      headingId,
      taskId,
    });
  }
}

async function deleteTask(req, res) {
  const { headingId, taskId } = req.params;

  if (!headingId || !taskId) {
    return res.status(401).json({
      message: "IDs not found",
      headingId,
      taskId,
    });
  }

  try {
    const todo = await todoModel.findOneAndUpdate(
      {
        _id: headingId,
        "tasks._id": taskId,
      },
      {
        $pull: {
          tasks: {
            _id: taskId,
          },
        },
      },
      {
        new: true,
      },
    );

    if (!todo) {
      return res.status(401).json({
        message: "No todo Found",
        headingId,
        taskId,
      });
    }

    return res.status(201).json({
      message: "Task Successfully Deleted",
      todo,
    });
  } catch (error) {
    return res.status(401).json({
      message: "Forbidden",
      headingId,
      taskId,
    });
  }
}

module.exports = {
  postTodo,
  getAllTodos,
  getTodoByHeading,
  updateTodoByHeading,
  deleteTodo,
  postTasks,
  updateTask,
  updateStatus,
  deleteTask,
};

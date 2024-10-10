const Todo = require('../model/ToDoModel');

// Create a new To-Do
exports.createTodo = async (req, res) => {
  const { title, description, dueDate, userId } = req.body;
  const todo = new Todo({
    title,
    description,
    dueDate,
    userId,
  });

  try {
    const savedTodo = await todo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all To-Dos
exports.getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a To-Do
exports.updateTodo = async (req, res) => {
  const { id } = req.params;

  try {
    const todo = await Todo.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!todo) {
      return res.status(404).json({ message: 'To-Do not found' });
    }

    res.json(todo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a To-Do
exports.deleteTodo = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTodo = await Todo.findByIdAndDelete(id);

    if (!deletedTodo) {
      return res.status(404).json({ message: 'To-Do not found' });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

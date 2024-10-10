const express = require('express');
const router = express.Router();
const todoController = require('../controller/ToDocontroller');

// Define routes for the To-Do API
router.post('/todos', todoController.createTodo);
router.get('/todos', todoController.getAllTodos);
router.put('/todos/:id', todoController.updateTodo);
router.delete('/todos/:id', todoController.deleteTodo);

module.exports = router;

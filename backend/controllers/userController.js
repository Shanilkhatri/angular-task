const User = require("../models/userModel");

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body); // make a new user from sent data
    res.json(user); // send back the newly created user
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll(); // get everything from DB
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a user
exports.updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    await User.update(req.body, { where: { id } }); // update the matching user
    res.json({ message: "User updated successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    await User.destroy({ where: { id } }); // remove that user from DB
    res.json({ message: "User deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

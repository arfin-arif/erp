const User = require("../models/userModel");

module.exports.getUsers = async (req, res, next) => {
    try {
        const role = req.params.role;
        console.log(role);
        const users = await User.find({ role: role });
        if (!users) {
            return res.status(400).send({ success: false, error: "No data found with this role" });
        }
        res.json(users)
    } catch (err) {
        next(err)
    }
}

module.exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({});
        res.send(users);
    } catch (err) {
        next(err)
        console.error(err);
        res.status(500).send('An error occurred while retrieving the users');
    }
}

module.exports.getAUser = async (req, res, next) => {
    try {
        const username = req.params.username;
        console.log(username);
        const user = await User.findOne({ username: username });
        if (!user) {
            return res.status(400).send({ success: false, error: "No data found with this username" });
        }
        res.json(user)
    } catch (err) {
        next(err)
    }
}
module.exports.deleteUser = async (req, res, next) => {
    try {
        const username = req.params.username;
        const result = await User.deleteOne({ username: username });
        if (result.deletedCount === 1) {
            res.send(`User with username ${username} has been deleted.`);
        } else {
            res.status(404).send(`User with username ${username} not found.`);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('An error occurred while deleting the user.');
    }
}
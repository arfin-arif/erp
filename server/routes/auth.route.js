const { login, register, getAllUsers, logOut } = require("../controllers/authController");

const router = require("express").Router();

router.post("/login", login)
router.post("/register", register);
router.get("/all-users/:id", getAllUsers);
router.get("/logout/:id", logOut);

module.exports = router;

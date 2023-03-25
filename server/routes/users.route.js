const { getAUser, getUsers, deleteUser, getAllUsers } = require("../controllers/usersController");
const router = require("express").Router();

router
    /**
     * @getApi to get user based on their @role
     * 
     */
    .get("/all/:role", getUsers)
router
    /**
     * @getApi to get user based on their @role
     * 
     */
    .get("/all", getAllUsers)
router
    /**
     * @getApi to get a particular students based on their ID
     */
    .get("/:username", getAUser)
router
    /**
     * @getApi to get a particular students based on their ID
     */
    .delete("/delete/:username", deleteUser)

module.exports = router;
const express = require("express");
const router = express.Router();
const users = require("../Controllers/users");

router.get("/:id", users.oneuser);
router.post("/", users.createUser);
router.delete("/:id", users.deleteUser);
module.exports = router;

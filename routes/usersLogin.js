const fs = require("fs");
const express = require("express");

const router = express.Router();

async function getUsersLogin(){
    const usersLogin = await fs.promises.readFile("usersLogin.json", "utf8");
    return JSON.parse(usersLogin);
}

router.get("/", async (req, res) => {
    res.send( await getUsersLogin() );
})

module.exports = router;
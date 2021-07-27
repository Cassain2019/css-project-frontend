const router = require("express").Router();
let Users = require("../users/users.model");
const bodyParser = require("body-parser").json();

router.route("/").post(bodyParser, (req, res) => {
  Users.find({
    email: req.body.email,
    password: req.body.password,
  })
    .then((user) => (user.length === 0 || user.length > 1)? res.json("Invalid") : res.json(user) )
    .catch((err) => res.json("error"));
});

module.exports = router;
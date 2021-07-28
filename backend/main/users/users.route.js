const router = require("express").Router();
let User = require("./users.model");
const bodyParser = require("body-parser").json();

//GET REQUESTS
router.route("/").get(bodyParser, (req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get(bodyParser, (req, res) => {
  User.findById(req.params.id)
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

//POST REQUESTS
router.route("/").post(bodyParser, (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then(() => res.json("Added"))
    .catch((err) => res.status(400).json("Error: ", err));
});

// POST REQUESTS
router.route("/:id").post(bodyParser, (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body)
    .then(() => res.json("Updated"))
    .catch((err) => res.status(400).json("Invalid Id: ", err));
});


// DELETE REQUESTS
router.route("/:id").delete(bodyParser, (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json("Deleted"))
    .catch(err => res.status(400).json("Invalid ID: ", err));
});

module.exports = router;

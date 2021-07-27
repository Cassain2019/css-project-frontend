const router = require("express").Router();
let Category = require("./categories.model");
const bodyParser = require("body-parser").json();

//GET REQUESTS
router.route("/company/:id").get(bodyParser, (req, res) => {
  Category.find({
    company: req.params.id,
  })
    .populate("company")
    .then((category) => res.json(category))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get(bodyParser, (req, res) => {
  Category.findById(req.params.id)
    .populate("company")
    .then((category) => res.json(category))
    .catch((err) => res.status(400).json("Error: " + err));
});

//POST REQUESTS
router.route("/").post(bodyParser, (req, res) => {
  const category = new Category(req.body);

  category
    .save()
    .then(() => res.json("Added"))
    .catch((err) => console.log("Error: ", err));
});

module.exports = router;

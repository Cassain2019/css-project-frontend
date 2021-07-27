const router = require("express").Router();
let Unit = require("./unit.model");
const bodyParser = require("body-parser").json();

// GET REQUEST 
router.route("/company/:id").get(bodyParser, (req, res) => {
  Unit.find({
    company: req.params.id,
  })
    .populate("company")
    .then((unit) => res.json(unit))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get(bodyParser, (req, res) => {
  Unit.findById(req.params.id)
    .populate("company")
    .then((unit) => res.json(unit))
    .catch((err) => res.status(400).json("Error: " + err));
});

// POST REQUEST
router.route("/").post(bodyParser, (req, res) => {
  const unit = new Unit(req.body);

  unit
    .save()
    .then(() => res.json("Added"))
    .catch((err) => console.log("Error: ", err));
});

module.exports = router;

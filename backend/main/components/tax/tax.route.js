const router = require("express").Router();
let Tax = require("./tax.model");
const bodyParser = require("body-parser").json();

// GET REQUEST
router.route("/company/:id").get(bodyParser, (req, res) => {
  Tax.find({
    company: req.params.id,
  })
    .populate("company")
    .then((tax) => res.json(tax))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get(bodyParser, (req, res) => {
  Tax.findById(req.params.id)
    .populate("company")
    .then((tax) => res.json(tax))
    .catch((err) => res.status(400).json("Error: " + err));
});

// POST REQUEST
router.route("/").post(bodyParser, (req, res) => {
  const tax = new Tax(req.body);

  tax
    .save()
    .then(() => res.json("Added"))
    .catch((err) => console.log("Error: ", err));
});

module.exports = router;

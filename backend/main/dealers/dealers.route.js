const router = require("express").Router();
let Dealers = require("./dealers.model");
const bodyParser = require("body-parser").json();

//GET REQUESTS
router.route("/company/:id").get(bodyParser, (req, res) => {
  Dealers.find({company: req.params.id })
    .populate("company")
    .then((dealers) => res.json(dealers))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:type/company/:id").get(bodyParser, (req, res) => {
  Dealers.find({ type: req.params.type, company: req.params.id })
    .populate("company")
    .then((dealers) => res.json(dealers))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/specific/:id").get(bodyParser, (req, res) => {
  Dealers.findById(req.params.id)
    .populate("company")
    .then((dealers) => res.json(dealers))
    .catch((err) => res.status(400).json("Error: " + err));
});

//POST REQUESTS
router.route("/").post(bodyParser, (req, res) => {
  const dealer = new Dealers(req.body);

  dealer
    .save()
    .then(() => res.json("Added"))
    .catch((err) => console.log("Error: ", err));
});

router.route("/:id").post(bodyParser, (req, res) => {
  Dealers.findByIdAndUpdate(req.params.id, req.body)
    .then(() => res.json("Updated"))
    .catch((err) => res.status(400).json("Invalid Id: ", err));
});

// DELETE REQUEST
router.route("/:id").delete(bodyParser, (req, res) => {
  Dealers.findByIdAndDelete(req.params.id)
    .then(() => res.json("Deleted"))
    .catch((err) => res.status(400).json("Invalid Id: ", err));
});

module.exports = router;

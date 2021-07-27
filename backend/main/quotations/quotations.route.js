const router = require("express").Router();
let Quotation = require("./quotations.model");
const bodyParser = require("body-parser").json();

// GET REQUESTS 
router.route("/company/:id").get(bodyParser, (req, res) => {
  Quotation.find({
    company: req.params.id,
  })
    .populate(["company", "creator", "customer"])
    .then((quote) => res.json(quote))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/specific/:id").get(bodyParser, (req, res) => {
  Quotation.findById(req.params.id)
    .populate(["company", "creator", "customer"])
    .then((quote) => res.json(quote))
    .catch((err) => res.json("error"));
});

router.route("/invoice").get(bodyParser, (req, res) => {
  Quotation.find({}, {}, { sort: { _id: -1 }, limit: 1 })
    .populate(["company", "creator", "customer"])
    .then((quote) => res.json(quote))
    .catch((err) => res.json(err));
});

// POST REQUEST
router.route("/").post(bodyParser, (req, res) => {
  const quote = new Quotation(req.body);

  quote
    .save()
    .then(() => res.json("Added"))
    .catch((err) => res.json(err));
});

router.route("/:id").post(bodyParser, (req, res) => {
  Quotation.findByIdAndUpdate(req.params.id, req.body)
    .then(() => res.json("Updated"))
    .catch((err) => res.json(err));
});

module.exports = router;

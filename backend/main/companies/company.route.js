const router = require("express").Router();
let Company = require("./company.model");
const bodyParser = require("body-parser").json();

// GET REQUESTS
router.route("/").get(bodyParser, (req, res) => {
  Company.find()
    .populate("o_id")
    .then((companies) => res.json(companies))
    .catch((err) => res.status(400).json("Error: " + err));
});
router.route("/:id").get(bodyParser, (req, res) => {
  Company.findById(req.params.id)
    .populate("o_id")
    .then((companies) => res.json(companies))
    .catch((err) => res.status(400).json("Error: " + err));
});

//POST REQUESTS
router.route("/").post(bodyParser, (req, res) => {
  const company = new Company(req.body);

  company
    .save()
    .then((data) => res.json(data.populate("o_id")))
    .catch((err) => console.log("Error: ", err));
});

router.route("/:id").post(bodyParser, (req, res) => {
  Company.findByIdAndUpdate(req.params.id, req.body)
    .then(() => res.json("Updated"))
    .catch((err) => res.status(400).json("Invalid Id: ", err));
});

//DELETE REQUESTS
router.route("/:id").delete((req, res) => {
  Company.findByIdAndDelete(req.params.id)
    .then(() => res.json("Deleted"))
    .catch((err) => res.json(err));
});

module.exports = router;

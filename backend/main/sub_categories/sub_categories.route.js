const router = require("express").Router();
let SubCategories = require("./sub_categories.model");
const bodyParser = require("body-parser").json();

// GET REQUESTS
router.route("/company/:id").get(bodyParser, (req, res) => {
  SubCategories.find()
    .populate({
      path: "category",
      populate: {
        path: "company",
        model: "companies",
      },
    })
    .then((subcategories) => res.json(subcategories))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/category/:id").get(bodyParser, (req, res) => {
  SubCategories.find({
    category: req.params.id,
  })
    .populate({
      path: "category",
      populate: {
        path: "company",
        model: "companies",
      },
    })
    .then((subcategories) => res.json(subcategories))
    .catch((err) => res.status(400).json("Error: " + err));
});
router.route("/:id").get(bodyParser, (req, res) => {
  SubCategories.findById(req.params.id)
    .populate({
      path: "category",
      populate: {
        path: "company",
        model: "companies",
      },
    })
    .then((subcategories) => res.json(subcategories))
    .catch((err) => res.status(400).json("Error: " + err));
});

//POST REQUESTS
router.route("/").post(bodyParser, (req, res) => {
  const subcategories = new SubCategories(req.body);

  subcategories
    .save()
    .then(() => res.json("Added"))
    .catch((err) => console.log("Error: ", err));
});

//DELETE REQUESTS
router.route("/:id").delete((req, res) => {
  SubCategories.findByIdAndDelete(req.params.id)
    .then(() => res.json("Deleted"))
    .catch((err) => res.json(err));
});

module.exports = router;

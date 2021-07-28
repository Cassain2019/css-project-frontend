// REQUIRMENTS
const router = require("express").Router();
const multiparty = require("connect-multiparty");
const fs = require("fs");
let Products = require("./products.model");
let multipartyMiddleware = multiparty({
  uploadDir: './public/images/product/'
});

// GET REQUESTS
router.route("/company/:id").get((req, res) => {
  Products.find({
    company: req.params.id,
  })
    .populate([
      "company",
      {
        path: "subCategory",
        populate: {
          path: "category",
          model: "categories",
        },
      },
      "tax",
      "unit",
    ])
    .then((products) => res.json(products))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Products.findById(req.params.id)
    .populate([
      "company",
      {
        path: "subCategory",
        populate: {
          path: "category",
          model: "categories",
        },
      },
      "tax",
      "unit",
    ])
    .then((products) => res.json(products))
    .catch((err) => res.status(400).json("Error: " + err));
});

// POST REQUESTS
router.route("/").post(multipartyMiddleware, (req, res) => {
  function fileUpload(data) {
    let tmp_path = req.files.file.path;
    let target_path =
      "./public/images/product/" +
      data._id +
      "." +
      req.files.file.path.split(".")[1];
    fs.rename(tmp_path, target_path, function (err) {
      if (err) throw err;
      fs.unlink(tmp_path, function () {
        if (err) throw err;
        Products.findByIdAndUpdate(data._id, {
          image: `images/product/${data._id}.${req.files.file.path.split(".")[1]}`,
        })
          .then(() => res.json("Added"))
          .catch((err) => res.status(400).json("Invalid Id: ", err));
      });
    });
  }
  const product = new Products(req.body);
  product
    .save()
    .then((data) =>
      Object.keys(req.files).length > 0 ? fileUpload(data) : res.json("Added")
    )
    .catch((err) => res.json(err));
});

router.route("/:id").post(multipartyMiddleware, (req, res) => {
  function fileUpload(data) {
    let tmp_path = req.files.file.path;
    let target_path =
      "./public/images/product/" +
      data._id +
      "." +
      req.files.file.path.split(".")[1];
    fs.rename(tmp_path, target_path, function (err) {
      if (err) throw err;
      fs.unlink(tmp_path, function () {
        if (err) throw err;
        res.json("Updated");
      });
    });
  }
  Products.findByIdAndUpdate(req.params.id, req.body)
    .then((data) =>
      Object.keys(req.files).length > 0 ? fileUpload(data) : res.json("Updated")
    )
    .catch((err) => res.json(err));
});

module.exports = router;

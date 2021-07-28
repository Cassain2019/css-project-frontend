const router = require("express").Router();
let Transaction = require("./transaction.model");
const bodyParser = require("body-parser").json();

// GET REQUESTS
router.route("/company/:id/:type").get(bodyParser, (req, res) => {
  Transaction.find({
    company: req.params.id,
    type: req.params.type,
  })
    .populate(["company", "creator", "dealer"])
    .then((transactions) => res.json(transactions))
    .catch((err) => res.status(400).json("Error: " + err));
});

// LATEST SALE & PURCHASE PRICES
router.route("/latest/:id").get(bodyParser, (req, res) => {
  let json = [];
  function response(data) {
    json.push(data[0]);
    if (json.length === 2) {
      res.json(json);
    }
  }
  let type = ["purchase", 'sale'];
  for (let i = 0; i < type.length; i++) {
    Transaction.find({
      "products.name": req.params.id,
      type: type[i],
    })
      .sort({ createdAt: -1 }).limit(1)
      .populate(["company", "creator", "dealer"])
      .then((transactions) => response(transactions))
      .catch((err) => res.json("Error"));
  }

});

//GETTING INVOICE BY ID
router.route("/specific/:id").get(bodyParser, (req, res) => {
  Transaction.findById(req.params.id)
    .populate(["company", "creator", "dealer"])
    .then((transactions) => res.json(transactions))
    .catch((err) => res.json("error"));
});


// GETTING INVOICE NUMBER
router.route("/invoice/:id").get(bodyParser, (req, res) => {
  Transaction.find({ type: req.params.id }, {}, { sort: { _id: -1 }, limit: 1 })
    .populate(["company", "creator", "dealer"])
    .then((transactions) => res.json(transactions))
    .catch((err) => res.json(err));
});



// POST REQUEST
router.route("/").post(bodyParser, (req, res) => {
  const transaction = new Transaction(req.body);

  transaction
    .save()
    .then(() => res.json("Added"))
    .catch((err) => res.json(err));
});


router.route("/:id").post(bodyParser, (req, res) => {
  Transaction.findByIdAndUpdate(req.params.id, req.body)
    .then(() => res.json("Updated"))
    .catch((err) => res.json(err));
});

module.exports = router;

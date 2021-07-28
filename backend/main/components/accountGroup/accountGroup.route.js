const router = require("express").Router();
let Classes = require("../accountClasses/accountClass.model");
let Account = require("./accountGroup.model");
const bodyParser = require("body-parser").json();

//GET REQUESTS
router.route("/company/:id").get(bodyParser, (req, res) => {
  Account.find({
    company: req.params.id,
  })
    .populate("company", "accountClass")
    .then((account) => res.json(account))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get(bodyParser, (req, res) => {
  Account.findById(req.params.id)
    .populate("company", "accountClass")
    .then((account) => res.json(account))
    .catch((err) => res.status(400).json("Error: " + err));
});

//POST REQUESTS
router.route("/").post(bodyParser, (req, res) => {
  const submit = (data) => {
    const account = new Account(data);
    account
      .save()
      .then(() => res.json("Added"))
      .catch(() => console.log("error"));
  }
  Account.find({
    company: req.body.company[0],
    accountClass: req.body.accountClass
  }).sort({ createdAt: -1 }).limit(1)
    .populate("company", "accountClass")
    .then((element) => {
      let code = 0;
      if (element.length === 0) {
        Classes.findById(req.body.accountClass)
          .then((acc) => {
            let code = acc.code + "10"
            let data = {
              company: req.body.company,
              code: code,
              accountType: req.body.accountType,
              accountClass: req.body.accountClass,
              name: req.body.name
            }
            submit(data);
          })
          .catch(() => res.json("error"));

      } else {
        code = parseInt(element[0].code) + 10;
        let data = {
          company: req.body.company,
          code: code,
          accountType: req.body.accountType,
          accountClass: req.body.accountClass,
          name: req.body.name
        }
        submit(data);
      }
    })
    .catch(() => res.json("error"));

});

router.route("/:id").post(bodyParser, (req, res) => {
  Account.findByIdAndUpdate(req.params.id, req.body)
    .populate("company")
    .then(() => res.json("Added"))
    .catch(() => res.status(400).json("error"));
});

module.exports = router;

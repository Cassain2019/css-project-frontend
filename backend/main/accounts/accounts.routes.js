const router = require("express").Router();
let Group = require("../components/accountGroup/accountGroup.model");
let Account = require("./accounts.model");
const bodyParser = require("body-parser").json();

//GET REQUESTS
router.route("/company/:id").get(bodyParser, (req, res) => {
  Account.find({
    company: req.params.id,
  })
  .populate([
    "company",
    {
      path: "group",
      populate: {
        path: "accountClass",
        model: "accountsClasses",
      },
    },
  ])
    .then((account) => res.json(account))
    .catch((err) => res.json("Error: " + err));
});

router.route("/:id").get(bodyParser, (req, res) => {
  Account.findById(req.params.id)
  .populate([
    "company",
    {
      path: "group",
      populate: {
        path: "accountClass",
        model: "accountsClasses",
      },
    },
  ])
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
    group: req.body.group
  }).sort({ createdAt: -1 }).limit(1)
  .populate([
    "company",
    {
      path: "group",
      populate: {
        path: "accountClass",
        model: "accountsClasses",
      },
    },
  ])
    .then((element) => {
      let code = 0;
      if (element.length === 0) {
        Group.findById(req.body.group)
          .then((acc) => {
            let code = acc.code + "10"
            let data = {
              company: req.body.company,
              code: code,
              group: req.body.group,
              name: req.body.name,
              description: req.body.description
            }
            submit(data);
          })
          .catch(() => res.json("error"));

      } else {
        code = parseInt(element[0].code) + 10;
        let data = {
          company: req.body.company,
          code: code,
          group: req.body.group,
          name: req.body.name,
          description: req.body.description
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

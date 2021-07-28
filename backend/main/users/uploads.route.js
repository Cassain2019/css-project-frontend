const router = require("express").Router();
let User = require("./users.model");
const multiparty = require("connect-multiparty");
const fs = require("fs");
let multipartyMiddleware = multiparty({
  uploadDir: './public/images/users/'
});

// POST REQUESTS
router.route("/:id").post(multipartyMiddleware, (req, res) => {
  let tmp_path = req.files.file.path;
  let target_path = `./public/images/users/${req.params.id}.${req.files.file.path.split(".")[1]}`;
  fs.rename(tmp_path, target_path, function (err) {
    if (err) throw err;
    fs.unlink(tmp_path, function () {
      if (err) throw err;
    });
  });
  User.findByIdAndUpdate(req.params.id, {
    image: `images/users/${req.params.id}.${req.files.file.path.split(".")[1]}`
  })
    .then(() => res.json("Updated"))
    .catch((err) => res.status(400).json("Invalid Id: ", err));
});
module.exports = router;

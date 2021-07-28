const express = require("express");
const cors = require("cors");
const mongoees = require("mongoose");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 4000;

let url = "mongodb://localhost:27017/FinancePortal";
url = "mongodb+srv://maha:F4DEA959@project.jq3hy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoees.connect(url, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoees.connection;
connection.once("open", () => {
  console.log("MongoDb Connected");
});

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});


//REDIRECTIONS
app.use("/users", require("./main/users/users.route"));
app.use("/userUpload", require("./main/users/uploads.route"));
app.use("/login", require("./main/login/login.route"));
app.use("/companies", require("./main/companies/company.route"));
app.use("/compUpload", require("./main/companies/uploads.route"));

app.use("/categories", require("./main/categories/category.route"));
app.use("/subcategories", require("./main/sub_categories/sub_categories.route"));
app.use("/taxes", require("./main/components/tax/tax.route"));
app.use("/units", require("./main/components/unit/unit.route"));

app.use("/products", require("./main/products/products.route"));
app.use("/dealers", require("./main/dealers/dealers.route"));

app.use("/quotations", require('./main/quotations/quotations.route'));
app.use("/transactions", require('./main/transactions/transaction.route'));
app.use("/classes", require('./main/components/accountClasses/accountClass.route'));
app.use("/groups", require('./main/components/accountGroup/accountGroup.route'));
app.use("/accounts", require('./main/accounts/accounts.routes'));

app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

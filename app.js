const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const methodOverride = require("method-override"); 
const flash = require("connect-flash");


if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const routes = require("./routes");
require("./config/mongoose");

const app = express();
const PORT = process.env.PORT;


app.engine("hbs", exphbs({ defaultLayout: "main", extname: ".hbs" })); 
app.set("view engine", "hbs"); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(methodOverride("_method")); 


app.use(routes);

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`);
});

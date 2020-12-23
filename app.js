//Packages
const express = require("express");
const expressEjsLayouts = require("express-ejs-layouts");
const app = express();

//Router
const addressRouter = require("./routers/address.js");
const errorRouter = require("./routers/error.js");
//middleware
app.use(expressEjsLayouts);
//Route Middleware
app.use(addressRouter);
app.use(errorRouter);
//ejs
app.set("view engine", "ejs");

// app.get(["/*", "/I/*", "I/want/title/"], (req, res) => {
//   res.status(404).send("Not found");
// });
app.listen(3000, () => {
  console.log("Server is up on port 3000");
});

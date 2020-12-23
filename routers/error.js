const express = require("express");
const router = new express.Router();

router.get(["/*", "/I/*", "I/want/title/"], (req, res) => {
  //In case of any error
  res.status(404).send("404: Not found");
});

module.exports = router;

const express = require("express");
const request = require("request");
const cheerio = require("cheerio");
const router = new express.Router();
let titlesProccessed = 0;
var titles = (add = []);

router.get("/I/want/title/", (req, res) => {
  address = req.query.address; //get url params
  arrayCheck = Array.isArray(address); //check wether the address is array or not
  if (!arrayCheck && address !== undefined) {
    //if it is not array then it means only one address is given in params
    let temp = [];
    temp.push(address);
    address = temp; //converting address type to array
  }
  if (!address) {
    //if address param is not given in url then this block of code will be executed
    res
      .status(404)
      .send(
        "Must provide address is URL: \n e.g. \\I\\want\\title\\?address=url.com"
      );
  } else if (address) {
    //if address is given then this block of code will execulte
    titlesProccessed = 0;
    titles = [];
    address.forEach((url) => {
      checkUrlhttp = url.includes("http://"); //checking url type
      if (!checkUrlhttp) {
        //
        let checkUrlhttps = url.includes("https://"); //checking url type
        if (!checkUrlhttps) {
          url = `https://${url}`; //if url protocol is not http then it will consider it https
        }
      }
      request(
        {
          url,
        },
        function (error, response, body) {
          if (body) {
            let $ = cheerio.load(body); //cheerio jQuery for node
            t = $("title").text(); //fetching text tag
            titles.push(t);
          } else {
            //if url body is not found then no response will be shown
            titles.push("No Response");
          }
          titlesProccessed++;
          console.log("TitlesProcessed: " + titlesProccessed);
          console.log("Address.length: " + address.length);
          if (titlesProccessed == address.length) {
            //condition for callback
            getTitles(titles, address);
          }
        }
      );
      function getTitles(titles, address) {
        console.log("Titles Final: " + titles);
        console.log("Address Final: " + address);
        res.render("layout", {
          //layout.ejs rendering
          address,
          titles,
        });
      }
    });
  }
});
module.exports = router;

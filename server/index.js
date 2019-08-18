const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const github = require('../helpers/github.js');
const database = require('../database/index.js');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  const user = Object.keys(req.body)[0];
  github.getReposByUsername(user, (err, results) => {

    if (err) {
      res.status(400).send(err);
    } else {
      const parsed = JSON.parse(results);
      let numberOfParsed = parsed.length;
      parsed.forEach(function(repo) {
        database.save(repo, (err, results) => {
          numberOfParsed--;
          if (numberOfParsed === 0) {
            res.status(200).send(results);
          }
        });
      })
     }
  });

});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos

    database.getRepos((err, results) => {
      if (err) {
        res.status(400).send(err);
      } else {
        const totalRepos = results.length;
        const sortData = results.sort(function(a, b) {
          return b.stars - a.stars;
        })
        const topTwentyFive = sortData.slice(0, 25);
        topTwentyFive.push(totalRepos);
        res.status(200).send(topTwentyFive);

      }
    })
  })

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

module.exports = app;
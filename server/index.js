const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const github = require('../helpers/github.js');
const database = require('../database/index.js');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.static(__dirname + '/../client/dist'));

// app.get('/repos', function(req, res) {
//   database.getRepos()
// })

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
      parsed.forEach(function(repo) {
        database.save(repo);
      })
      res.status(200).send(results);
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
        const sortData = results.sort(function(a, b) {
          return a.stargazers_count - b.stargazera_count;
        })
        const topTwentyFive = sortData.slice(-25);
        console.log(topTwentyFive)
        res.status(200).send(topTwentyFive);

      }
    })
  })

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

module.exports = app;
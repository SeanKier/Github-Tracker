const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const getRepos = require('../helpers/github.js');
const database = require('../database/index.js');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.static(__dirname + '/../client/dist'));

app.get('/repos', function(req, res) {
  database.getRepos()
})

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  const user = Object.keys(req.body)[0];
  getRepos.getReposByUsername(user, (err, results) => {

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

    })
  }

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

module.exports = app;
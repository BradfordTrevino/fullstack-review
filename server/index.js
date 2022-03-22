const express = require('express');
const { getReposByUsername } = require('../helpers/github');
const { save } = require('../database/index');
let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(express.json());

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  getReposByUsername(req.body.username, (repoData) => {
    console.log(repoData);
    save(repoData, (repos) => {
      res.send(repos);
    })
  })
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos

});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});


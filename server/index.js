const express = require('express');
const { getReposByUsername } = require('../helpers/github');
const { save, retrieve, userCheck } = require('../database/index');
let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(express.json());

app.post('/repos', function (req, res) {
  userCheck(req.body.username, (existingRepoData) => {
    if (existingRepoData.length) {
      res.send(existingRepoData);
    } else {
      getReposByUsername(req.body.username, (repoData) => {
        console.log(repoData);
        save(repoData, (repos) => {
          res.send(repos);
        })
      })
    }
  });
});

app.get('/repos', function (req, res) {
  retrieve(data => {
    let dataLength;
    data.length >= 25 ? dataLength = 25 : dataLength = data.length;
    let top25 = [];
    for (let i = 0; i < dataLength; i++) {
      top25.push(data[i]);
    }
    res.send(top25);
  })});

let port = process.env.PORT;
if (port == null || port == '') {
  port = 1128;
}

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});


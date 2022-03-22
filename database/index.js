const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

let repoSchema = mongoose.Schema({
  repo_id: Number,
  repo_name: String,
  owner_id: Number,
  owner_name: String,
  forks: Number,
  watchers: Number,
  updated_at: Date
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repositories, callback) => {
  console.log(repositories);
  Repo.insertMany(repositories)
    .then((response) => {
      console.log('Repositories inserted succesfully!');
      callback(response);
    })
}

// let

module.exports.save = save;
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

let repoSchema = mongoose.Schema({
  _id: Number,
  repo_name: String,
  owner_id: Number,
  owner_name: String,
  forks: Number,
  watchers: Number,
  url: String,
  updated_at: Date
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repositories, callback) => {
  Repo.insertMany(repositories)
    .then((response) => {
      // console.log(response);
      console.log('Repositories inserted succesfully!');
      callback(response);
    })
}

let retrieve = (callback) => {
  Repo.find({}).sort('-watchers')
    .then((data) => {
      callback(data);
    })
}

let userCheck = (username, callback) => {
  Repo.find({ owner_name: username })
    .then((response) => {
      console.log('User data check complete!')
      callback(response);
    })
}

module.exports.save = save;
module.exports.retrieve = retrieve;
module.exports.userCheck = userCheck;
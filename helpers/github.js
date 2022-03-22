const axios = require('axios');
const config = require('../config.js');

let getReposByUsername = (username, callback) => {
  let options = {
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  let repoData;

  axios.get(options.url)
    .then((response) => {
      repoData = response.data.map(repo => {
        repoData = {
          _id: repo.id,
          repo_name: repo.name,
          owner_id: repo.owner.id,
          owner_name: repo.owner.login,
          forks: repo.forks,
          watchers: repo.watchers,
          url: repo.html_url,
          updated_at: repo.updated_at
        };
        return repoData;
      })
      callback(repoData);
      console.log('GitHub repositories fetched successfully!');
    })
    .catch((err) => {
      console.log('Failed to fetch GitHub repositories!');
    })
}

module.exports.getReposByUsername = getReposByUsername;
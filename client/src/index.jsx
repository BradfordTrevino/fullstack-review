import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }

  }

  search (term) {
    console.log(`${term} was searched`);
    axios.post('/repos', {
      username: term
    })
    .then((response) => {
      console.log(`Response is ${response}`)
      this.updateRepos()
    })
    .catch((err) => {
      console.log(err);
    })
  }

  updateRepos() {
    axios.get('/repos')
    .then((response) => {
      let updatedRepos = [...response.data];
      this.setState({
        repos: updatedRepos
      });
    })
  }

  componentDidMount() {
    this.updateRepos()
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
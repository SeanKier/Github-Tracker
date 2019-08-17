import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }

  }
  getTopRepos() {
    $.ajax({
      type: "get",
      url: "http://localhost:1128/repos",
      contentTupe: "application/json",
      success: (data) => {
        console.log(data);
      },
      error: () => {
        console.log('>>>>>>>>>>>>>>> post error')
      }

    })
  }
  search (term) {
    console.log(`${term} was searched`);
    // TODO
    //post request
    $.ajax({
      type: "post",
      url: "http://localhost:1128/repos",
      data: term,
      contentTupe: "application/json",
      success: (data) => {
        console.log(data);
      },
      error: () => {
        console.log('>>>>>>>>>>>>>>> post error')
      }

    })

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
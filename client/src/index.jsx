import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: [],
      number: 0
    }

  }
 
  search (term) {
    // console.log(`${term} was searched`);
    // TODO
    //post request
    $.ajax({
      type: "post",
      url: "http://localhost:1128/repos",
      data: term,
      contentTupe: "application/json",
      success: (data) => {
        // console.log(data);
        this.getRequest();
      },
      error: () => {
        console.log('>>>>>>>>>>>>>>> post error')
      }

    })

  }
  componentDidMount() {
    this.getRequest();

  }
  getRequest(){

    $.ajax({
      type: "get",
      url: "http://localhost:1128/repos",
      contentTupe: "application/json",
      success: (data) => {
        const repoList = data.slice(0, -1);
        const totalNumber = data.slice(-1)
        this.setState({
          repos: data,
          number: totalNumber
        })
      },
      error: () => {
        console.log('>>>>>>>>>>>>>>> get error')
      }

    })
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos} number={this.state.number}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
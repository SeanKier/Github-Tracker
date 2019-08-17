import React from 'react';
const RepoTableRow = (props) => {
  // console.log(props.repo,userName);
  // console.log()
  return (
    <tr>
      <td> {props.repo.userName}</td>
      <td> {props.repo.projectName}</td>
      <td> {props.repo.projectUrl}</td>
      <td> {props.repo.description}</td>
      <td> {props.repo.stars}</td>
    </tr>
  )
}
const RepoList = (props) => (

  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.

    <table>
      {props.repos.map(repo =>
          <RepoTableRow repo={repo} />
        )}
    </table>

  </div>
)

export default RepoList;

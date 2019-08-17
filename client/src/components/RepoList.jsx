import React from 'react';
const RepoTableRow = (props) => {
  // console.log(props.repo.userName);
  // console.log()

  return (
    <tr>
      <td> {props.repo.userName}</td>
      <td> {props.repo.projectName}</td>
      <td>
        <a href={`${props.repo.projectUrl}`}>{props.repo.projectUrl}</a>
      </td>
      <td> {props.repo.description}</td>
      <td> {props.repo.stars}</td>
    </tr>
  )
}
const RepoList = (props) => (

  <div>

    There are {props.number} repos.
    <h4> Top 25 Reops </h4>

    <table>
      <tbody>
        {props.repos.map(repo =>
            <RepoTableRow repo={repo} />
          )}
      </tbody>
    </table>


  </div>
)

export default RepoList;

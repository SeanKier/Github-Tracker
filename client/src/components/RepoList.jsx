import React from 'react';
const RepoTableRow = (props) => {

  return (
    <tr>

      <td>
        <a href={`${props.repo.userName}`}>{props.repo.userName}</a>
      </td>
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
      <thead>
      <tr>
        <th>Username URL</th>
        <th>Repo Name</th>
        <th>Repo URL</th>
        <th>Description</th>
        <th>Star Count</th>
      </tr>
      </thead>
      <tbody>
        {props.repos.map(repo =>
            <RepoTableRow repo={repo} />
          )}
      </tbody>
    </table>


  </div>
)

export default RepoList;

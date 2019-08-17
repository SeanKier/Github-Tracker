const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  userID: Number,
  projectName: String,
  userName: String,
  projectUrl: String,
  description: String,
  stars: Number

});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repo, callback) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  const newRepo = new Repo({
    userID: repo.owner.id,
    projectName: repo.name,
    userName: repo.owner.html_url,
    projectUrl: repo.html_url,
    description: repo.description,
    stars: repo.stargazers_count
  })
  // newRepo.save((error, newRepo) => {
  //   if (error) {
  //     console.log("ERROR >>>> " + error);
  //   } else {
  //     console.log("SAVED >>>>");
  //   }
  // })
  Repo.findOne({projectUrl: repo.html_url}, function(err, results) {
    console.log(results);
    if (results === null) {
      const newRepo = new Repo({
        userID: repo.owner.id,
        projectName: repo.name,
        userName: repo.owner.html_url,
        projectUrl: repo.html_url,
        description: repo.description,
        stars: repo.stargazers_count
      })
      newRepo.save((error, newRepo) => {
        if (error) {
          callback(error, null);
        } else {
          callback(error, newRepo);
        }
      })
    }
  })

}
// Repo.remove({}, function(err) {
//   console.log('collection removed')
// });

const getRepos = (callback) => {

  // // fetch the data
  // console.log('getRepos >>>>>>>>>>>>>>>>>>>>>>>')
  Repo.find({}, (err, data) => {
    // console.log('err >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', err);
    // console.log('dara >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', data);
    if (err) {

      callback(err, null);
    } else {
      callback(null, data);
    }
  });

 }

module.exports.save = save;
module.exports.getRepos = getRepos;
//Init GitHuB

const github = new Github
const ui = new UI

//Search Input
const searchUser = document.getElementById('searchUser')

searchUser.addEventListener('keyup', (e) => {
  //Get Input Text
  const userText = e.target.value
  
    if(userText !== ''){
      //Make HTTP Call
      github.getUser(userText)
        .then(data => {
          if(data.profile.message === 'Not Found'){
            //Show Alert
            ui.showAlert('User Not Found', 'alert alert-danger')
            
          } else {
            ui.clearAlertMsg()
            console.log(data)
            ui.showProfile(data.profile)
            ui.showRepos(data.repos)
          }
        })
    } else {
      ui.clearProfile()
    }

})
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
            
          } else {
            ui.showProfile(data.profile)
          }
        })
    } else {
      // Clear Profile
    }

})
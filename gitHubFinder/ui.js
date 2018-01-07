class UI {
	constructor(){
		this.profile = document.getElementById('profile')
	}
	
	showProfile(user) {
		this.profile.innerHTML = `
			<div class='card card-body mb-5'>
				<div class='row'>
					<div class='col-md-3'>
						<img class='img-fluid mb-2 d-flex mx-auto' src='${user.avatar_url}'>
						<a href='${user.html_url}' target='_blank' class='btn btn-primary btn-block mb-4'>View Profile</a>
					</diV>
					<div class='col-md-9'>
						<div id='badges' class='text-md-left text-center'>
							<span class='badge badge-light'>Public Repos: ${user.public_repos}</span>
							<span class='badge badge-secondary'>Public Gists: ${user.public_gists}</span>
							<span class='badge badge-success'>Followers: ${user.followers}</span>
							<span class='badge badge-info'>Following: ${user.following}</span>
						</div>
						<br><br>
						<ul class='list-group mb-4'>
							<li class='list-group-item'>Company: ${user.company}</li>
							<li class='list-group-item'>Website: ${user.blog}</li>
							<li class='list-group-item'>Location: ${user.location}</li>
							<li class='list-group-item'>Member Since: ${user.created_at}</li>
						</ul>
					</diV>
				</di>
			</div>
			<h3 class='page-heading mb-3'>Latest Repos</h3>
			<div id='repos'></div>
		`
	}
	
	//Show Repos
	showRepos(repos){
		let output = ''
		
		repos.forEach(repo => {
			output += `
			<div class='card card-body mb-2'>
				<div class='row'>
					<div class='col-md-6'>
						<a target='_blank' href='${repo.html_url}'>${repo.name}</a>
					</div>
					<div class='col-md-6'>
						<div id='badges' class='text-md-left text-center'>
							<span class='badge badge-light'>Stars: ${repo.stargazers_count}</span>
							<span class='badge badge-secondary'>Watchers: ${repo.watchers_count}</span>
							<span class='badge badge-success'>Forks: ${repo.forks_count}</span>
						</div>
					</div>
				</div>
			</diV>
			`
		})
		
		//Output Repositories
		document.getElementById('repos').innerHTML = output
	}
	
	//Clear Alert Message
	clearProfile() {
		this.profile.innerHTML = ''
	}
	
	// Show alert message
	showAlert(msg, className){
		//Clear any remaining alerts
		this.clearAlertMsg()
		//Create Div
		const div = document.createElement('div')
		//Add Classes
		div.className = className
		//Add Text
		div.appendChild(document.createTextNode(msg))
		//Get Parent
		const container = document.querySelector('.search-container')
		//Get Search Box
		const search = document.querySelector('.search')
		//Insert Alert
		container.insertBefore(div, search)
		
		//Timeout after 3 seconds
		setTimeout(() => {
			this.clearAlertMsg()
		}, 3000)
	}
	
	clearAlertMsg(){
		const currentAlert = document.querySelector('.alert')
		if(currentAlert){
			currentAlert.remove()
		}
	}
}
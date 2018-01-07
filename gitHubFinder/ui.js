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
}
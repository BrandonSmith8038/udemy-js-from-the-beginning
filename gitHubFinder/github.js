class Github{
  constructor(){
    this.client_id = '8f31d9b72cfc28929b65'
    this.client_secret = 'c3733438b80c557d0620a03558b304b099c83bbc'
    this.repos_count = 10
    this.repos_sort = 'created: asc'
  }
  
  async getUser(user){
    const profileResponse = await fetch(`https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`)
    
    const repoResponse = await fetch(`https://api.github.com/users/${user}/repos?per_page=${this.repos_count}&sort=${this.repos_sort}&client_id=${this.client_id}&client_secret=${this.client_secret}`)
    
    const profile = await profileResponse.json()
    const repos = await repoResponse.json()
    
    return{
      profile,
      repos
    }
  }
}
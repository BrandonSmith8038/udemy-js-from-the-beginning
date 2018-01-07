class Github{
  constructor(){
    this.client_id = '8f31d9b72cfc28929b65'
    this.client_secret = 'c3733438b80c557d0620a03558b304b099c83bbc'
  }
  
  async getUser(user){
    const profileResponse = await fetch(`https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`)
    
    const profile = await profileResponse.json()
    
    return{
      profile
    }
  }
}
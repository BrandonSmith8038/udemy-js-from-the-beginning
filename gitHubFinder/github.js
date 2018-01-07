class Github{
  constructor(){
    this.client_id = 'Iv1.8dac05007f637979'
    this.client_secret = 'f5cb1bbf943052a0582a942483f00baabf8c93cf'
  }
  
  async getUser(user){
    const profileResponse = await fetch(`https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`)
    
    const profile = await profileResponse.json()
    
    return{
      profile
    }
  }
}
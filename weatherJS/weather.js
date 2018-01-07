class Weather {
  constructor(city, state){
    this.apiKey = '1736777390df38cd'
    this.city = city
    this.state = state
  
  }
  
  //Fetch weather from api
  
  async getWeather(){
    const response = await fetch(`https://api.wunderground.com/api/${this.apiKey}/conditions/q/${this.state}/${this.city}.json`)

    const responseData = await response.json()
    
    return responseData.current_observation
  }
  
  //Change Weather Location
  changeLocation(city, state){
    this.city = city
    this.state = state
  }
}
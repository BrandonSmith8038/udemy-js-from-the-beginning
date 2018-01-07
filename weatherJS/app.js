//Init Storage Objec
const storage = new Storage()

//Get stored location data
const weatherLocation = storage.getLocationData()

//Init Weather Object
const weather = new Weather(weatherLocation.city, weatherLocation.state)
//Init UI Object
const ui = new UI()


// Get weather on DOM load
document.addEventListener('DOMContentLoaded', getWeather)

//Change Location Event
document.getElementById('w-changeBtn').addEventListener('click', e => {
  const city = document.getElementById('city').value
  const state = document.getElementById('state').value
  
  //Change Location
  weather.changeLocation(city, state)
  
  //Set Location IN Local Storage
  storage.setLocationData(city, state)
  
  //Get and Display Weather
  getWeather()
  
  $('#locModal').modal('hide')
})

function getWeather(){
  weather.getWeather()
  .then(results => {
    console.log(results)
    ui.paint(results)
  })
  .catch(err => console.log(err))
}


  
  
//Init Weather Object

// Get weather on DOM load
document.addEventListener('DOMContentLoaded', getWeather)

const weather = new Weather('Goodyear', 'Az')


function getWeather(){
  weather.getWeather()
  .then(data => {
    console.log(data)
    document.getElementById('w-location').textContent = data.observation_location.full
  })
  .catch(err => console.log(err))
}


  
  
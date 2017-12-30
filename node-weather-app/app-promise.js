const yargs = require('yargs')
const axios = require('axios')

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather for',
      string: true
    }
  })
  .help()
  .alias('help', 'h').argv

const encodedAddress = encodeURIComponent(argv.address)
const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${
  encodedAddress
}`

axios
  .get(geocodeUrl)
  .then(response => {
    if (response.data.status === 'ZERO_RESULTS') {
      throw new Error('Unable to find that Address')
    }
    const geo = {
      lat: response.data.results[0].geometry.location.lat,
      lng: response.data.results[0].geometry.location.lng
    }
    const weatherUrl = `https://api.darksky.net/forecast/ec1a0e05367cc305b6a0f8465ee8c7c1/${
      geo.lat
    },${geo.lng}?units=si`
    console.log(response.data.results[0].formatted_address)
    return axios.get(weatherUrl)
  })
  .then(response => {
    const weather = {
      temp: response.data.currently.temperature,
      realTemp: response.data.currently.apparentTemperature
    }
    debugger
    console.log(
      `It's currently ${weather.temp}. It feels like ${weather.realTemp}`
    )
  })
  .catch(e => {
    if (e.code === 'ENOTEFOUND') {
      console.log('Unable to connect to API service')
    } else {
      console.log(e.message)
    }
  })

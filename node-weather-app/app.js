const yargs = require('yargs')

const geocode = require('./geocode/geocode')
const weather = require('./weather/weather')

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
console.log(argv)

geocode.geocodeAddress(argv.a, (errorMessage, results) => {
  if (errorMessage) {
    console.log(errorMessage)
  } else {
    console.log(results.address)
    weather.getWeather(
      results.latitude,
      results.longitude,
      (errorMessage, weatherResults) => {
        if (errorMessage) {
          console.log(errorMessage)
        } else {
          console.log(
            `It is ${weatherResults.temp}, but it feels like ${
              weatherResults.realTemp
            }`
          )
        }
      }
    )
  }
})
// ec1a0e05367cc305b6a0f8465ee8c7c1

const request = require('request')

const getWeather = (lat, lng, callback) => {
  const key = 'ec1a0e05367cc305b6a0f8465ee8c7c1'

  request(
    {
      url: `https://api.darksky.net/forecast/${key}/${lat},${lng}?units=si`,
      json: true
    },
    (error, response, body) => {
      if (!error && response.statusCode === 200) {
        callback(undefined, {
          temp: body.currently.temperature,
          realTemp: body.currently.apparentTemperature
        })
      } else {
        callback('Unable to connect to DarkSky servers.')
      }
    }
  )
}

module.exports = {
  getWeather
}

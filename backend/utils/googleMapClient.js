const googleMapsClient = require('@google/maps').createClient({
  key: process.env.GOOGLE_MAPS_API_KEY
})


function getElevation (coordinates) {
  return new Promise((resolve, reject) => {
    googleMapsClient.elevation({
      locations: coordinates
    }, (err, response) => {
      if (err) return reject(err)
      return response.json.results
    })
  })
}


module.exports = {
  getElevation
}

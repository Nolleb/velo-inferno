
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const fetchToken = async() => {
  try {
    //"https://www.strava.com/oauth/token"
    const auth_link = 'https://www.strava.com/oauth/token';
    //const auth_link = process.env.auth_link;

    //client_id = 101110
    //client_secret = "f6c8ecae0633d3a0d9eaa3c115cdce70928be308"
    //refresh_token = "80e9c7bd6fe32296d207d4271c278de83ed29548"
    //app_key = "dcdb1041582dd7818f7e401854619349b6b791a2"
    //authorization_code = "dcdb1041582dd7818f7e401854619349b6b791a2"
    //auth_link = "https://www.strava.com/oauth/token"
    //activity_since = 1546300800


    const options = {
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          client_id: 101110,
          client_secret: "f6c8ecae0633d3a0d9eaa3c115cdce70928be308",
          refresh_token: "80e9c7bd6fe32296d207d4271c278de83ed29548",
          //code: "dcdb1041582dd7818f7e401854619349b6b791a2",
          grant_type: 'refresh_token'
      })
    };
    let response = await fetch(auth_link, options);
	  response = await response.json();
    return response;
  }
  catch(err) {
    console.log('reponse pourrie')
    console.error(err);
  }
}

module.exports = {fetchToken}

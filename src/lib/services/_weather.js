export const weatherService = {
  eventTarget: new EventTarget(),
  
  initialize() {
    this.requestWeatherData();
  },

  async authenticate() {
    let result = await fetch("https://test.api.amadeus.com/v1/security/oauth2/token", {
      method: "GET",
      headers: {
        "content-Type": "application/x-www-form-urlencoded"
      },
      body: JSON.stringify({
        "grant_type": "client_credentials",
        "client_id": "1EkHdZtaes3xzeaRiOhAiJcgn2Cy7zKQ",
        "client_secret": "Q8qmXm7gj82n9Vjv"
      }),
    });

    console.log(result);
  },
  
  requestWeatherData() {
  }
}
export default function ({ $axios, $config }, inject) {
  // Create a custom axios instance
  const apiKeyValue = $config.apiKeyValue
  const ticketApiUrl = $config.ticketSystem.apiURL
  const api = $axios.create({
    headers: {
      common: {
        Accept: 'application/json',
        'x-api-key': apiKeyValue,
        'x-comony-api': true
      }
    }
  })

  // Set baseURL to something different
  api.setBaseURL(ticketApiUrl)

  // Inject to context as $api
  inject('api', api)
}

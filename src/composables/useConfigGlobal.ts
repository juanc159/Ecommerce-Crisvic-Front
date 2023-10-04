export function useConfigGlobal() {
  const publicKeyWompi = "pub_test_ckvIYwzyg0fjPQfwK2qWMMxKADVvYMS6"
  const privateKeyWompi = "prv_test_2N41c9h2bxQYTYfGqPlOuqV1A90b6H1p"
  const environment = "https://sandbox.wompi.co/v1"
  // const environment = "https://production.wompi.co/v1"

  const webURL = 'https://system.vetszoo.com'
  const baseUrl = 'https://system.vetszoo.com'
  // const webURL = 'http://localhost:5173/'
  // const baseUrl = 'http://127.0.0.1:8000'
  const baseApi = baseUrl + '/api'
  return {
    webURL,
    baseUrl,
    baseApi,
    publicKeyWompi,
    privateKeyWompi,
    environment
  }
}

export const apiBaseUrl = 'http://localhost:8080'
const base = {
  get() {
    return {
      url: apiBaseUrl + '/xinyu/',
      name: 'xinyu',
      frontUrl: 'http://localhost:8080/front/h5/index.html',
    }
  },
}
export default base
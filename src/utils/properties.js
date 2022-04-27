const PropertiesReader = require('properties-reader')
const properties = PropertiesReader(`./src/utils/${process.env.NODE_ENV}.properties`)

module.exports = {
  getCorsDomain() {
      return properties.get("access.cors.domain")
  },
  getEncryptKey() {
      return properties.get("encrypt.key");
  }
}
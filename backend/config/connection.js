// backend/config/connection.js
const username = 'zenchi-inventory-demo-admin'
const password = '2fXo66YtMWlJ6btu'
const hostname = 'cluster0-faakr.mongodb.net'
const database = 'zenchi-inventory-demo'

module.exports = {
  connect: `mongodb+srv://${username}:${password}@${hostname}/${database}`
}
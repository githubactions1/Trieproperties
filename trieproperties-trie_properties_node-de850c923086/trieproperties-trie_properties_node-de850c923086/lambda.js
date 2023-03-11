'use strict'
const path = require('path')
const awsServerlessExpress = require('aws-serverless-express')
const app = require('./trie_properties')
const StaticFileHandler = require('serverless-aws-static-file-handler')

const clientFilesPath = path.join(__dirname, "./public/")
const fileHandler = new StaticFileHandler(clientFilesPath)
const server = awsServerlessExpress.createServer(app)

exports.handler = (event, context) => { awsServerlessExpress.proxy(server, event, context) }

module.exports.html = async (event, context) => {
  event.path = "index.html" // forcing a specific page for this handler, ignore requested path. This would serve ./data-files/index.html
  return fileHandler.get(event, context)
}
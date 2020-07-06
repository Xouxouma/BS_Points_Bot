require('dotenv').config()
var read = require('./read')
var readRankingLinks = require('./data_persistency/readRankingLinks')
const data_file = './db/scores_data.json'
const Discord = require('discord.js')
const fs = require('fs')
const client = new Discord.Client()
const User = require('./model/User.js')
// var scores = new Map()
// var data = fs.readFileSync(data_file)
// var scores = JSON.parse(data)

client.login(process.env.BOT_TOKEN)

var scores = read();
var rankings_links = readRankingLinks();
// var rankings_links = new Map();

fs.readdir('./events/', (err, files) => {
  files.forEach(file => {
    const eventHandler = require(`./events/${file}`)
    const eventName = file.split('.')[0]
    client.on(eventName, (...args) => eventHandler(client, scores, rankings_links, ...args))
  })
})



require('http').createServer().listen(2091)

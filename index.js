require('dotenv').config()

const Discord = require('discord.js')
const fs = require('fs')
const client = new Discord.Client()
const User = require('./model/User.js')
var scores = new Map()

fs.readdir('./events/', (err, files) => {
  files.forEach(file => {
    const eventHandler = require(`./events/${file}`)
    const eventName = file.split('.')[0]
    client.on(eventName, (...args) => eventHandler(client, scores, ...args))
  })
})

client.login(process.env.BOT_TOKEN)

require('http').createServer().listen()

require('dotenv').config()
var read = require('./read')
var readRankingLinks = require('./data_persistency/readRankingLinks')
var readTitles = require('./data_persistency/readTitles')
const data_file = './db/scores_data.json'
const {Client, GatewayIntentBits} = require('discord.js')
const fs = require('fs')
const client = new Client({intents: [GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers]})
const User = require('./model/User.js')

client.login(process.env.BOT_TOKEN)

var scores = read();
var rankings_links = readRankingLinks();
var rankings_titles = readTitles();
// var scores = new Map()
// var rankings_titles = new Map()
// var rankings_links = new Map();

fs.readdir('./events/', (err, files) => {
  files.forEach(file => {
    const eventHandler = require(`./events/${file}`)
    const eventName = file.split('.')[0]
    client.on(eventName, (...args) => eventHandler(client, scores, rankings_links, rankings_titles, ...args));
  })
})
client.on('ready', () => {
    console.error('client > ready fired!');
});

client.on('message', () => {
	console.log("message received\n")
});

client.on('warn', (msg) => {
    console.error('client > warn fired!');
    console.warn(msg);
});
client.on('error', (msg) => {
    console.error('client > error fired!');
    console.error(msg);
});


require('http').createServer().listen(2091)

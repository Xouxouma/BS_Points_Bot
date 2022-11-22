// const csv = require('csv-parser');
// const fs = require('fs');
const checkTitles = require('./util/checkTitles')
const save = require('../save')


function addPointsToRanking(message, ranking, points, events, member, guild_rankings_links, rankings_titles) {
    if (events.get(ranking) == undefined)
        events.set(ranking, new Map())
    let users = events.get(ranking)

    let parentRanking = guild_rankings_links.get(ranking)
    if (parentRanking != undefined) {
        for (let i = 0; i < parentRanking.length; i++) {
            addPointsToRanking(message, parentRanking[i], points, events, member, guild_rankings_links, rankings_titles)
        }
    }
    return addAmountOfPointsToSb(message, points, users, member, rankings_titles, ranking)
}

function addAmountOfPointsToSb(message, points, users, member, ranking_titles, rankingName){
    //let memberId = "<@"+member.id+">"
    let memberId = member.toUpperCase()
    if (users.get(memberId) == undefined)
        users.set(memberId,0)
    let prevPoints = users.get(memberId)
    users.set(memberId,prevPoints+points)
    let answer = memberId.toString()+" ("+ users.get(memberId)+ ")\n"
    //checkTitles(message, member, users.get(memberId), ranking_titles, "" + member.guild.id, rankingName)
    return answer
}

module.exports = (guildId, scores, message,words, rankings_links, rankings_titles) => {
    if (message.member.roles.find(r => r.name === "Admin" || r.name === "b! point giver")) {
        let members = words.clone(); // each member can be any string actually
        members.split(0,3)
        let points = parseInt(words[2])
        console.log('trying to give points with words: ' + words.toString())
        if (isNaN(points))
            return message.reply("Error! Mention how much points you want to add.\nTry : b!add <ranking> <number of points> <@nobody> <@some cool guy> ... <@another one>")

        // message.channel.send("Yo I'm still up dw points will be added even if the embed message doesn't appear")

        let answer = 'You have granted ' + points + ' points to:\n'
        // fs.createReadStream(generateFilePath(guildId))

        if (scores.get(guildId) == undefined)
            scores.set(guildId, new Map())
        let events = scores.get(guildId)

        if (events.get(words[1]) == undefined)
            return message.reply("Error! You need to mention an existing ranking!\nTry : b!add <ranking> <number of points> <@nobody> <@some cool guy> ... <@another one>")

        if (rankings_links.get(message.guild.id) == undefined)
            rankings_links.set(message.guild.id, new Map())
        let guild_rankings_links = rankings_links.get(message.guild.id)

        if (!members || members.length == 0)
            return message.reply("Error! You need to give guild name(s) to give them points!\nTry : b!add <ranking> <number of points> <guild> <some other guild>")
        
        console.log('trying to give points with members: ' + members.toString())

        members.forEach(member => {
            answer = answer + addPointsToRanking(message, words[1], points, events, member, guild_rankings_links, rankings_titles)
        })
        save(scores)
        // message.channel.send("... points added, if I like you I'll display new scores")

        message.channel.send({embed: {
                title: 'Points added in ' + words[1],
                description: answer
            }})
    }
    else
        message.reply("Only an Admin or a 'b! point giver' can give points! You can't fool probot that easily :P")
}

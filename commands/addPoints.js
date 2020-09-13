// const csv = require('csv-parser');
// const fs = require('fs');
const checkTitles = require('../commands/util/checkTitles')
const save = require('../save')

function generateFilePath(message) {
  guildId = message.guild.id
  ranking = message.content.split(" ")[1]
  return "db/"+guildId+"/"+ranking
}

function addPointsToRanking(message, ranking, points, events, member, guild_rankings_links, rankings_titles) {
    if (events.get(ranking) == undefined)
        events.set(ranking, new Map())
    let users = events.get(ranking)

    let parentRanking = guild_rankings_links.get(ranking)
    if (parentRanking != undefined)
    {
        addPointsToRanking(message,parentRanking, points, events, member, guild_rankings_links, rankings_titles)
    }
    return addAmountOfPointsToSb(message, points, users, member, rankings_titles, ranking)
}

function addAmountOfPointsToSb(message, points, users, member, ranking_titles, rankingName){
    let memberId = "<@"+member.id+">"
    if (users.get(memberId) == undefined)
        users.set(memberId,0)
    let prevPoints = users.get(memberId)
    users.set(memberId,prevPoints+points)
    let answer = member.toString()+" ("+ users.get(memberId)+ ")\n"
    checkTitles(message, member, users.get(memberId), ranking_titles, "" + member.guild.id, rankingName)
    return answer
}

module.exports = (guildId, scores, message,words, rankings_links, rankings_titles) => {
    if (message.member.roles.find(r => r.name === "Admin" || r.name === "b! point giver")) {
        let points = parseInt(words[2])

        if (isNaN(points))
            return message.reply("Error! Mention how much points you want to add to mentioned people.\nTry : b!points <ranking> <points à ajouter> <@personne1> <@personne2> ... <@personne n>")

        let answer = 'You have granted ' + points + ' points to:\n'
        // fs.createReadStream(generateFilePath(guildId))

        if (scores.get(guildId) == undefined)
            scores.set(guildId, new Map())
        let events = scores.get(guildId)

        if (events.get(words[1]) == undefined)
            return message.reply("Error! You need to mention an existing ranking!\nTry : b!points <ranking> <points à ajouter> <@personne1> <@personne2> ... <@personne n>")

        if (rankings_links.get(message.guild.id) == undefined)
            rankings_links.set(message.guild.id, new Map())
        let guild_rankings_links = rankings_links.get(message.guild.id)

        if (message.mentions.members.size == 0)
            return message.reply("Error! You need to mention people to give them points!\nTry : b!points <ranking> <points à ajouter> <@personne1> <@personne2> ... <@personne n>")

        message.mentions.members.forEach(member => {
            answer = answer + addPointsToRanking(message, words[1], points, events, member, guild_rankings_links, rankings_titles)
        })
        save(scores)
        message.channel.send({embed: {
                title: 'Points added in ' + words[1],
                description: answer
            }})
    }
    else
        return message.reply("Only an Admin or a 'b! point giver' can give points! You can't fool probot that easily :P")
}

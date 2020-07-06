// const csv = require('csv-parser');
// const fs = require('fs');
const save = require('../save')

function generateFilePath(message) {
  guildId = message.guild.id
  ranking = message.content.split(" ")[1]
  return "db/"+guildId+"/"+ranking
}

function addAmountOfPointsToSb(points, users, member, message){
    memberId = "<@"+member.id+">"
    if (users.get(memberId) == undefined)
        users.set(memberId,0)
    prevPoints = users.get(memberId)
    users.set(memberId,prevPoints+points)
    return member.toString()+" ("+ users.get(memberId)+ ")\t"
}

module.exports = (guildId, scores, message,words) => {
    if (message.member.roles.find(r => r.name === "Admin")) {
        var getRanking = require('./getRanking')

        var points = parseInt(words[2])

        if (isNaN(points))
            return message.reply("Error! Mention how much points you want to add to mentioned people.\nTry : b!points <ranking> <points à ajouter> <@personne1> <@personne2> ... <@personne n>")

        var answer = 'You have granted ' + points + ' points to: '
        // fs.createReadStream(generateFilePath(guildId))

        if (scores.get(guildId) == undefined)
            scores.set(guildId, new Map())
        events = scores.get(guildId)

        if (events.get(words[1]) == undefined)
            return message.reply("Error! You need to mention an existing ranking!\nTry : b!points <ranking> <points à ajouter> <@personne1> <@personne2> ... <@personne n>")

        if (events.get(words[1]) == undefined)
            events.set(words[1], new Map())
        users = events.get(words[1])

        if (message.mentions.members.size == 0)
            return message.reply("Error! You need to mention people to give them points!\nTry : b!points <ranking> <points à ajouter> <@personne1> <@personne2> ... <@personne n>")

        message.mentions.members.forEach(member => {
            answer = answer + addAmountOfPointsToSb(points, users, member, message)
        })
        save(scores)
        message.reply(answer)
    }
    else
        return message.reply("Only an Admin can give points! You can't fool probot that easily :P")
}

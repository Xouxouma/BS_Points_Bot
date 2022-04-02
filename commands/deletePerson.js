// const csv = require('csv-parser');
// const fs = require('fs');
const save = require('../save')

function deleteSbFromRanking(member, ranking){
    let memberId = "<@"+member.id+">"
    if (users.get(memberId) == undefined)
        users.set(memberId,0)

    users.delete(memberId)

    let answer = member.toString()+"\n"
    return answer
}


module.exports = (guildId, message) => {
    if (message.member.roles.find(r => (r.name === "Admin" || r.name === "b!dictator"))) {

        if (isNaN(points))
            return message.reply("Error! Mention how much points you want to add to mentioned people.\nTry : b!points <ranking> <points à ajouter> <@personne1> <@personne2> ... <@personne n>")

        // message.channel.send("Yo I'm still up dw points will be added even if the embed message doesn't appear")

        let answer = ''
        // fs.createReadStream(generateFilePath(guildId))

        if (scores.get(guildId) == undefined)
            scores.set(guildId, new Map())
        let events = scores.get(guildId)

        // if (events.get(words[1]) == undefined)
        //     return message.reply("Error! You need to mention an existing ranking!\nTry : b!points <ranking> <points à ajouter> <@personne1> <@personne2> ... <@personne n>")

        // if (rankings_links.get(message.guild.id) == undefined)
        //     rankings_links.set(message.guild.id, new Map())
        // let guild_rankings_links = rankings_links.get(message.guild.id)

        if (message.mentions.members.size == 0)
            return message.reply("Error! You need to mention people to give them points!\nTry : b!kick <@ID1> <@ID2> ...")

        message.mentions.members.forEach(member => {
            rankings.forEach((ranking, rankingName) => {
                answer += deleteSbFromRanking(member, ranking)
            })
        })
        save(scores)
        // message.channel.send("... points added, if I like you I'll display new scores")

        message.channel.send({embed: {
                title: 'Removed some guys',
                description: answer
            }})
    }
    else
        message.reply("Only an Admin or a 'b! point giver' can give points! You can't fool probot that easily :P")
}

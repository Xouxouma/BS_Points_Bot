// const csv = require('csv-parser');
// const fs = require('fs');
const save = require('../save')

function deleteSbFromRanking(member, ranking, rankingName){
    let memberId = "<@"+member.id+">"
    let answer = ""
    if (ranking.get(memberId) != undefined) {
        ranking.delete(memberId)
        answer = member.toString()+" from "+ rankingName + "\n"
    }
    return answer;
}


module.exports = (guildId, message, scores) => {
    if (message.member.roles.find(r => (r.name === "Admin" || r.name === "b!dictator"))) {
        console.log("trying to kick people...")

        let answer = ''
        // fs.createReadStream(generateFilePath(guildId))

        // if (events.get(words[1]) == undefined)
        //     return message.reply("Error! You need to mention an existing ranking!\nTry : b!points <ranking> <points à ajouter> <@personne1> <@personne2> ... <@personne n>")

        // if (rankings_links.get(message.guild.id) == undefined)
        //     rankings_links.set(message.guild.id, new Map())
        // let guild_rankings_links = rankings_links.get(message.guild.id)

        if (message.mentions.members.size == 0)
            return message.reply("Error! You need to mention people to give them points!\nTry : b!kick <@ID1> <@ID2> ...")

        if (scores.get(guildId) == undefined)
            scores.set(guildId, new Map())
        let rankings = scores.get(guildId)

        message.mentions.members.forEach(member => {
            console.log("trying to kick : " + member.toString())
            rankings.forEach((ranking, rankingName) => {
                answer += deleteSbFromRanking(member, ranking, rankingName)
            })
        })
        save(scores)
        // message.channel.send("... points added, if I like you I'll display new scores")

        message.channel.send({embed: {
                title: 'Some people now belongs to the trash',
                description: answer
            }})
    }
    else
        message.reply("Only an Admin or a 'b! point giver' can give points! You can't fool probot that easily :P")
}

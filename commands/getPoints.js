const getRankingMemberPoints = require("../commands/util/getRankingMemberPoints")

function getMemberPoints(rankings, member)
{
    let answer = ""
    rankings.forEach((ranking, rankingName) => {
        answer += "**" + rankingName + "** : " + getRankingMemberPoints(ranking, member) + " \n"
    })
    return answer
}

module.exports = (guildId, message, scores, author) => {

    if (scores.get(guildId) == undefined)
        scores.set(guildId, new Map())
    let rankings = scores.get(guildId)

    answer = getMemberPoints(rankings, author)
    console.log("someone asked points of: "+author.id+" , this guy has : "+answer)
    message.channel.send({embeds: [{
            description: "<@"+author.id+">\n\n" + answer
        }]})
     return answer
}

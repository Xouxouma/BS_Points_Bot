function getRankingMemberPoints(ranking, member)
{
    let memberId = "<@"+member.id+">"
    if (ranking.get(memberId) != null)
        return "" + ranking.get(memberId)
    else return 0
}

function getMemberPoints(rankings, member)
{
    let answer = ""
    rankings.forEach((ranking, rankingName) => {
        answer += "**" + rankingName + "** : " + getRankingMemberPoints(ranking, member) + " \n"
    })
    return answer
}

module.exports = (guildId, message, scores) => {
    let author = message.author

    if (scores.get(guildId) == undefined)
        scores.set(guildId, new Map())
    let rankings = scores.get(guildId)

    answer = getMemberPoints(rankings, author)
    message.channel.send({embed: {
            description: "<@"+author.id+">\n\n" + answer
        }})
     return answer
}

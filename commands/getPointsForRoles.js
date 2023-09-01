const getRankingMemberPoints = require("./util/getRankingMemberPoints")

function getPointsForASingleRole(ranking, role, allMembers) {
    let acc = 0
    let members = allMembers.filter(member => { 
        return member.roles.find(r => r.id === role.id);
    });
    members.forEach(member => {
        let memberPoints = ranking.get("<@"+member.id+">")
        if (memberPoints) {
            acc += memberPoints
        }
    })
    return role.toString() + ": " + acc + "\n"
}

module.exports = (guildId, scores, rankingName, roles, message) => {

    let allMembers = message.guild.members
    if (scores.get(guildId) == undefined)
        scores.set(guildId, new Map())
    let rankings = scores.get(guildId)
    let ranking = rankings.get(rankingName)
    if (!rankings)
        return message.reply("Error! You need to mention an existing role!\nTry : b!expose <ranking> <@someRole>")

    if (roles.size === 0)
        return message.reply("Error! You need to mention role(s) !\nTry : b!expose <ranking> <@someRole>")

    let answer = ""
    // foreach role get its members, and add the points
    roles.forEach(role => {
        answer += getPointsForASingleRole(ranking, role, allMembers)
    })

    message.channel.send({
        embeds: [{
            title: rankingName + ' (points per role)',
            description: answer
        }]
    })
    return answer
}

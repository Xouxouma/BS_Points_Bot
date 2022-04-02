const checkTitles = require("../commands/util/checkTitles")
const getPoints = require("../commands/getPoints")
const getRankingMemberPoints = require("../commands/util/getRankingMemberPoints")

module.exports = (message, scores, rankings_titles) => {
    let scores_guild = scores.get(message.guild.id)
    message.member.addRole("715167963392639036")
    message.guild.members.forEach(member =>
        scores_guild.forEach((ranking, rankingName) => {
            // console.log("CHECKTITLES of rankingname : " + rankingName)
            checkTitles(message, member, getRankingMemberPoints(ranking, member), rankings_titles, message.guild.id, rankingName)
        })
    )
}

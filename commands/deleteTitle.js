saveTitles = require('../data_persistency/saveTitles')


module.exports = (message, title, rankings_titles) => {
    if (!message.member.roles.cache.find(r => r.name === "Admin"))
        return message.reply("Only an Admin can do that! You can't fool probot that easily :P")

    let titleId = title.id
    if (rankings_titles.get(message.guild.id) == undefined)
        return message.reply("Error! No title defined on this server")

    let rankings_titles_guild = rankings_titles.get(message.guild.id)
    // console.log("delete title : " + titleId + " ; rtg = " + rankings_titles_guild)
    let answer = "" + title + " deleted from  "
    rankings_titles_guild.forEach((ranking, ranking_name) => {
        // console.log("ranking_name = " + ranking_name)
        if (ranking.get(titleId) != undefined) {
            ranking.delete(titleId)
            answer += ranking_name +" "
        }
    })
    answer += " rewards"

    saveTitles(rankings_titles)

    return message.reply(answer)
}

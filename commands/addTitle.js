saveTitles = require('../data_persistency/saveTitles')


module.exports = (message, scores, title, nbpts, ranking, rankings_titles) => {
    if (!message.member.roles.find(r => r.name === "Admin"))
        return message.reply("Only an Admin can do that! You can't fool probot that easily :P")

    let titleId = title.id
    let rankings = scores.get(message.guild.id)
    if (rankings == undefined)
        return message.reply("Error! No ranking on this server.\nTry: b!create <ranking-name>")

    if (rankings.get(ranking) == undefined)
        return message.reply("Error! No ranking named " + ranking + " on this server.\nTry: b!create " + ranking)

    if (rankings_titles.get(message.guild.id) == undefined)
        rankings_titles.set(message.guild.id, new Map())
    let rankings_titles_guild = rankings_titles.get(message.guild.id)

    if (rankings_titles_guild.get(ranking) == undefined)
        rankings_titles_guild.set(ranking, new Map())
    let titles = rankings_titles_guild.get(ranking)

    titles.set(titleId, nbpts)


    // console.log("rankings_titles updated = " + rankings_titles)

    saveTitles(rankings_titles)

    answer = "" + title + " will be given to members having " + nbpts + " " + ranking

    return message.reply(answer)
}
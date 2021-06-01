saveLinks = require('../data_persistency/saveLinks')

function createLoop(guild_ranking_links, childRanking, parentRanking) {
    let newParentRanking = guild_ranking_links.get(parentRanking)
    if (newParentRanking != undefined)
        if (newParentRanking == childRanking)
            return true
        else createLoop(guild_ranking_links,childRanking, newParentRanking)
    else return false
}

function link (guild_ranking_links, childRanking, parentRanking)
{
    if (!createLoop(guild_ranking_links, childRanking, parentRanking))
    {
        if (!guild_ranking_links.get(childRanking)) {
            console.log("adding array " + rankingName)
            guild_ranking_links.set(rankingName, [])
        }
        console.log("`" + parentRanking + "` will gain points everytime `" + childRanking + "` does.")
        guild_ranking_links.get(childRanking).push(parentRanking);
        return "`" + parentRanking + "` will gain points everytime `" + childRanking + "` does."
    }
    else return "Error: can't create a loop!"
}


module.exports = (message,scores, rankings_links) => {
    if (!message.member.roles.find(r => r.name === "Admin"))
        return message.reply("Only an Admin can do that! You can't fool probot that easily :P")
    let childRanking = message.content.split(" ")[1]
    if (childRanking == undefined)
        return "child ranking undefined"

    let parentRanking = message.content.split(" ")[2]
    if (parentRanking == undefined)
        return "child ranking undefined"

    let rankings = scores.get(message.guild.id)
    if (rankings == undefined)
        return "Error! No ranking on this server.\nTry: b!create <ranking-name>"

    if (rankings.get(childRanking)==undefined)
        return "Error! The ranking " + childRanking + " doesn't exist on this server.\nTry: b!create <ranking-name>"
    if (rankings.get(parentRanking)==undefined)
        return "Error! The ranking " + parentRanking + " doesn't exist on this server.\nTry: b!create <ranking-name>"

    if (rankings_links.get(message.guild.id) == undefined)
        rankings_links.set(message.guild.id, new Map());
    let guild_rankings_links = rankings_links.get(message.guild.id)

    let answer = link(guild_rankings_links, childRanking, parentRanking)

    saveLinks(rankings_links)

    return message.reply(answer)
}

async function addRole(message, member, title) {
    try {
        if (message.guild.members.cache.get(member.id) && !member.roles.cache.get(title))
        {
            // console.log("0 - Role given : " + title + " to " + member.id)
            await member.roles.add(title)
            // console.log("1 - Role given : " + title + " to " + member.id)
            message.channel.send("Congrats <@" + member.id + "> for your new title : " + message.guild.roles.cache.get(title).name + "!")
        }
    }
    catch (exception)
    {
        console.log("addRole bugged : member : " + member + " title : " + title)
        return exception
    }
}

module.exports = (message, member, memberPts, rankings_titles, guildId, rankingName) => {
    // console.log("Check Titles")
    // console.log("guildId = " + guildId)
    // console.log("member = " + member.toString() + " // " + message.guild.members.get(member.id).nickname)
    // console.log("rankingName = " + rankingName)

    if (rankings_titles.get(guildId) == undefined)
        return
    let rankings_titles_guild = rankings_titles.get(guildId)
    if (rankings_titles_guild.get(rankingName) == undefined)
        return
    let ranking_titles = rankings_titles_guild.get(rankingName)

    // console.log("rankings_titles= " + rankings_titles)
    ranking_titles.forEach((nbpts, title) => {
        if (!message.guild.roles.cache.get(title)) return;
        // // console.log("----\ntitle = " + message.guild.roles.get(title).name)
        // let nbpts = rankings_titles.get(title)
        // console.log("nbpts = " + nbpts)
        if (memberPts >= nbpts)
        {
            // console.log("Role will be given : " + title + " to " + member.id)
            addRole(message, member, title)
        }
        // else console.log("Role not given, not enough points")
    })
}

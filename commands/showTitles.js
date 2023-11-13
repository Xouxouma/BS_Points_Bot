// async function getTitles(message, title) {
//     try {
//         if (!await member.roles.has(title))
//         {
//             await member.addRole(title)
//             // console.log("Role given : " + title + " to " + member.id)
//             message.channel.send("Congrats <@" + member.id + "> for your new title : " + message.guild.roles.get(title).name + "!")
//         }
//     }
//     catch (exception)
//     {
//         return exception
//     }
// }

module.exports = (message, rankings_titles) =>
{
    let answer = ""
    let rankings_titles_guild = rankings_titles.get(message.guild.id)
    if (rankings_titles_guild) {
        rankings_titles_guild.forEach((ranking, ranking_name) => {
            ranking.forEach((nbpts, title) => {
                if (message.guild.roles.cache.get(title)) {
                    answer += "" + message.guild.roles.cache.get(title).name + " : " + nbpts + " " + ranking_name + "\n"
                } else {
                    answer += "(deleted role)" + title + " : " + nbpts + " " + ranking_name + "\n"
                }
            })
        })
        message.channel.send({embeds: [{
            title: 'Titles',
            description: answer
        }]})
    }
}
    
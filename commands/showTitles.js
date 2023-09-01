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
    rankings_titles_guild.forEach((ranking, ranking_name) => {
        ranking.forEach((nbpts, title) => {
            answer += "" + message.guild.roles.get(title).name + " : " + nbpts + " " + ranking_name + "\n"
        })
    })
    message.channel.send({embeds: [{
            title: 'Titles',
            description: answer
        }]})
}

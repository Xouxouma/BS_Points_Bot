var getRanking = require('./getRanking')

module.exports = (message, scores) => {
  // if (!message.member.roles.cache.find(r => r.name === "Admin"))
  //   return message.reply("Only an Admin can give points! You can't fool probot that easily :P")
  rankings = scores.get(message.guild.id)
  if (rankings == undefined)
    return message.reply("No ranking defined yet on this server.")
  if (rankings.size == 0)
    return message.reply("No ranking found on this server.")

  rankings.forEach((ranking, rankingName) => {
    let answers = getRanking(ranking)
    for (let i = 0; i < answers.length; i++)
    {
      message.channel.send({embeds: [{
          title: rankingName + " (" + (i+1) + " / " + answers.length + ")",
          description: answers[i]
        }]})
    }
  })

  // return message.reply("there you go :\n\n"+answer)
}

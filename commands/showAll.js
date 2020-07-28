var getRanking = require('./getRanking')
var Discord = require('discord.js')
module.exports = (message, scores) => {
  if (!message.member.roles.find(r => r.name === "Admin"))
    return message.reply("Only an Admin can give points! You can't fool probot that easily :P")
  message.reply("All the rankings are :\n")
  rankings = scores.get(message.guild.id)
  if (rankings == undefined)
    return message.reply("No ranking defined yet on this server.")
  if (rankings.size == 0)
    return message.reply("No ranking found on this server.")

  rankings.forEach((ranking, rankingName) => {
    answer = getRanking(ranking)
    message.channel.send({embed: {
        title: rankingName,
        description: answer
      }})
  })

  // return message.reply("there you go :\n\n"+answer)
}

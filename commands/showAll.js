var getRanking = require('./getRanking')

module.exports = (message, scores) => {
  if (!message.member.roles.find(r => r.name === "Admin"))
    return message.reply("Only an Admin can give points! You can't fool probot that easily :P")
  var answer = "All the rankings are :\n"
  rankings = scores.get(message.guild.id)
  if (rankings == undefined)
    return message.reply("No ranking defined yet on this server.")
  if (rankings.size == 0)
    return message.reply("No ranking found on this server.")
  console.log("scores keys" + Object.keys(scores))
  rankings.forEach(ranking => {
    console.log("ranking key" + ranking.key)
      // let rankingsName = Object.keys(guild)
      answer += "Ranking : " + ranking.key + "\n" + getRanking(ranking)
})
  return message.reply("there you go :\n"+answer)
}

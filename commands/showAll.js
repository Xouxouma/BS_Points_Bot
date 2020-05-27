var getRanking = require('./getRanking')

module.exports = (message, scores) => {
  var rankingName = message.content.split(" ")[1]
  var answer = "All the rankings are :\n"
  rankings = scores.get(message.guild.id)
  if (rankings == undefined)
    return message.reply("No ranking defined yet on this server.")
  if (rankings.size == 0)
    return message.reply("No ranking found on this server.")
  rankings.forEach(ranking => {
      answer += "Ranking : " + rankingName + "\n" + getRanking(ranking)
})
  return message.reply("there you go :\n"+answer)
}

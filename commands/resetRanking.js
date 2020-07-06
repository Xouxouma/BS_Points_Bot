const save = require('../save')

module.exports = (message,scores) => {
  if (!message.member.roles.find(r => r.name === "Admin"))
    return message.reply("Only an Admin can can do that! You can't fool probot that easily :P")
  guildId = message.guild.id
  eventName = message.content.split(" ")[1]
  if (eventName == undefined)
    return message.reply("Error! No event name given.\nTry b!create <event-name>")

  if (scores.get(guildId) == undefined)
    scores.set(guildId,new Map())
  events = scores.get(guildId)

  if (events.get(eventName) == undefined)
    return message.reply("Error! Event doesn't existing on this discord server.\nTry b!create <event-name>")

  events.set(eventName, new Map())
  save(scores)

  if (events.get(eventName) == undefined)
    return message.reply("Error! Something went wrong cause I am badly coded.\nTry b!create <event-name>")

  return message.reply("The ranking " + eventName + " has been reset.")
}

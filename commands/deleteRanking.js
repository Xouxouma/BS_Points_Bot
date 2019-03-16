
module.exports = (message,scores) => {
  guildId = message.guild.id
  eventName = message.content.split(" ")[1]
  if (eventName == undefined)
    return message.reply("Error! No event name given.\nTry b!create <event-name>")

  if (scores.get(guildId) == undefined)
    scores.set(guildId,new Map())
  events = scores.get(guildId)

  if (events.get(eventName) == undefined)
    return message.reply("Error! Event doesn't existing on this discord server.\nTry b!create <event-name>")

  events.delete(eventName)

  if (events.get(eventName) != undefined)
    return message.reply("Error! Something went wrong cause I am badly coded.\nTry b!create <event-name>")

  return message.reply("The ranking " + eventName + " has been deleted.")
}

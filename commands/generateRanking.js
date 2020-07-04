const save = require('../save')

function generateFilePath(message) {
  guildId = message.guild.id
  ranking = message.content.split(" ")[1]
  if (ranking == undefined)
    throw "Error! No event name given.\nTry b!create <event-name>."
  return "db/"+guildId+"/"+ranking+".csv"
}

module.exports = (message,scores) => {
  if (!message.member.roles.find(r => r.name === "Admin"))
    return message.reply("Only an Admin can give points! You can't fool probot that easily :P")
  // try {
  //   var filepath = generateFilePath(message)
  // }
  // catch(e) {
  //   console.log(e)
  //   return message.reply(e)
  // }

  guildId = message.guild.id
  eventName = message.content.split(" ")[1]
  if (eventName == undefined)
    return message.reply("Error! No event name given.\nTry b!create <event-name>")

  if (scores.get(guildId) == undefined)
    scores.set(guildId,new Map())
  events = scores.get(guildId)

  if (events.get(eventName) != undefined)
    return message.reply("Error! Event already existing within this discord server.\nTry b!create <event-name>")

  events.set(eventName, new Map())

  save(scores)
  if (events.get(eventName) == undefined)
    return message.reply("Error! Something went wrong cause I am badly coded. MB Sorry.\nTry b!create <event-name>")

  return message.reply("The ranking " + eventName + " has been created.")
}

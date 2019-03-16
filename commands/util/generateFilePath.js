module.exports = message => {
  guildId = message.guild.id
  ranking = message.content.split(" ")[1]
  if (ranking == undefined)
    throw "Error! Parameter not found."
  return "db/"+guildId+"/"+ranking+".csv"
}

var addPoints = require('../commands/addPoints')
var generateRanking = require('../commands/generateRanking')
var showAll = require('../commands/showAll')
var leaderboard = require('../commands/leaderboard')
var deleteRanking = require('../commands/deleteRanking')
var resetRanking = require('../commands/resetRanking')
var read = require('../read')
var save = require('../save')

module.exports = (client, scores, message) => {
  if (message.content.startsWith('b!')) {
    var words = message.content.split(' ');
    switch (words[0])
    {
      case 'b!ping':
        var ping = Date.now() - message.createdTimestamp;
        message.reply("Pong... `" + `${ping}` + "ms` !");
        break
      case 'b!pts':
      case 'b!add':
      case 'b!':
      case 'b!points':
        return addPoints(message.guild.id, scores, message, words);
        break
      case'b!new':
      case 'b!create':
        return generateRanking(message,scores)
        break
      case 'b!showall':
      case 'b!all':
        return showAll(message,scores)
        break
      case 'b!show':
      case 'b!leaderboard':
      case 'b!ranking':
      case 'b!whoisthebest':
        message.reply(leaderboard(message,scores))
        break
      case 'b!delete':
      case 'b!del':
      case 'b!kill':
        return deleteRanking(message,scores)
        break
      case 'b!reset':
        return resetRanking(message,scores)
        break
      // case 'b!read':
      //   scores = read()
      //   break
      case 'b!save':
        save(scores)
        break
      default:
        message.reply("Sorry there's no help section cause it's a lazy homemade implementation ! Ask your leader.\n\nAfterall, here is a clue, try: b!points <ranking-name> <amount-of-points> <member 1> ... <member N>")
        break;
    }
    save(scores);
  }
}

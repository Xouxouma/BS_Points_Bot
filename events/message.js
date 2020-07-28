var addPoints = require('../commands/addPoints')
var generateRanking = require('../commands/generateRanking')
var showAll = require('../commands/showAll')
var leaderboard = require('../commands/leaderboard')
var deleteRanking = require('../commands/deleteRanking')
var resetRanking = require('../commands/resetRanking')
var read = require('../read')
var save = require('../save')
var linkRankings = require('../commands/linkRankings')
var getPoints = require('../commands/getPoints')

module.exports = (client, scores, rankings_links, message) => {
  if (message.content.startsWith('b!')) {
    var words = message.content.split(' ');
    switch (words[0])
    {
      case 'b!ping':
        var ping = Date.now() - message.createdTimestamp;
        message.reply("Pong... `" + `${ping}` + " ms` !");
        break
      case 'b!add':
        return addPoints(message.guild.id, scores, message, words, rankings_links);
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
        return leaderboard(message,scores)
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
      case 'b!link':
        return linkRankings(message, scores, rankings_links);
        break
      case 'b!rank':
      case 'b!points':
      case 'b!amigood':
      case 'b!me':
        return getPoints(message.guild.id, message, scores)
        break
      default:
        message.reply("Looks like you're struggling, the only public commands are :\n" +
            "\t- b!show RANKINGNAME : show the ranking\n" +
            "\t- b!points : show your scores in all rankings")
        break;
    }
    save(scores);
  }
}

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
var updateTitles = require('../commands/updateTitles')
var addTitle = require('../commands/addTitle')
var readTitles = require('../data_persistency/readTitles')
var showTitles = require('../commands/showTitles')
var deleteTitle = require('../commands/deleteTitle')

module.exports = (client, scores, rankings_links, rankings_titles, message) => {
  if (message.content.startsWith('b!') ||message.content.startsWith('B!')) {
    var words = message.content.split(' ');
    switch (words[0].toLowerCase())
    {
      case 'b!ping':
        var ping = Date.now() - message.createdTimestamp;
        message.reply("Pong... `" + `${ping}` + " ms` !");
        break
      case 'b!add':
        return addPoints(message.guild.id, scores, message, words, rankings_links, rankings_titles);
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
        return getPoints(message.guild.id, message, scores, message.author)
        break
      case 'b!updatetitles':
        return updateTitles(message, scores, rankings_titles)
        break
      case 'b!addtitle':
        return addTitle(message, scores, message.mentions.roles.first(), words[1], words[2], rankings_titles)
        break
      case 'b!readtitle':
        return readTitles()
        break
      case 'b!titles':
      case 'b!showtitles':
        return showTitles(message, rankings_titles)
        break
      case 'b!deletetitle':
        return deleteTitle(message, message.mentions.roles.first(), rankings_titles)
        break
      case 'b!stalk':
      case 'b!check':
      case 'b!whois':
        return getPoints(message.guild.id, message, scores, message.mentions.members.first())
        break
      case 'b!kick':
      case 'b!traitor':
        return deletePerson(message.guild.id, message);
        break;
      default:
        message.channel.send(
            {embed: {
                title: 'Help',
                description: "Looks like you're struggling, the only public commands are :\n" +
                    "\t- **b!show TOTO** : show the ranking named TOTO\n" +
                    "\t- **b!points** : show your scores in all rankings\n" +
                    "\t- **b!stalk @LaBaguette**: show the scores of LaBaguette\n" +
                    "\t- for **b! point giver**:\n" +
                    "\t- **b!add total 1 @LaBaguette** : add 1 point in the total ranking to LaBaguette"
              }})
        break;
    }
    // save(scores);
  }
}

let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const data_file = './db/links_data.json'
const fs = require('fs')
const save = require('../save')


function createLinks(data)
{
    let scores = new Map()


    /*try {
        data = fs.readFileSync(data_file)
        console.log("readlinks data : " + data)
    } catch (err) {
        if (err.code === 'ENOENT') {
            console.log('no data: create new');
            return scores;
        } else {
            throw err;
        }
    }*/
    console.log("Start readRankingLinks")
    console.log("data = " + data)
    let parsed = JSON.parse(data)
    console.log("parsed = " + parsed)

    let guilds = Object.keys(parsed);
    console.log("guilds = " + guilds)

    for( let i = 0,length = guilds.length; i < length; i++ ) {
        let guild = parsed[ guilds[ i ] ]
        let rankings = Object.keys(guild)
        console.log("rankings = " + rankings)

        let guildId = guilds[i]
        console.log("guildId = " + guildId)
        scores.set(guildId, new Map())
        let scores_guild = scores.get(guildId)
        console.log("scores_guild = " + scores_guild)

        for( let j = 0,length = rankings.length; j < length; j++ ) {
            let parentRanking = guild[ rankings[ j ] ]

            let rankingName = rankings[j]
            console.log("rankingName = " + rankingName + " , parentRanking = " + parentRanking)
            if (!scores_guild.get(rankingName)) {
                console.log("creating array for " + rankingName)
                scores_guild.set(rankingName, [])
            }
            for (let i = 0; i < parentRanking.length ; i++) {
                console.log("parentRanking["+i+"] = " + parentRanking[i])
                scores_guild.get(rankingName).push(parentRanking[i])
            }
        }
    }
    console.log("END readRankingLinks")
    return scores
}

module.exports = () => {

    let req = new XMLHttpRequest()

    req.open("GET", process.env.JSONLINKS_URL + "/latest", false);
    req.setRequestHeader("secret-key", process.env.JSONBIN_SECRET_KEY);
    req.send();

    console.log("req.responseText " + req.responseText)
    return createLinks(req.responseText)

}
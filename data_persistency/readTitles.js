let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const data_file = './db/titles.json'
const fs = require('fs')


function createTitles(data)
{
    let rankings_titles = new Map()

/*    try {
        data = fs.readFileSync(data_file)
        // console.log("readlinks data : " + data)
    } catch (err) {
        if (err.code === 'ENOENT') {
            // console.log('no data: create new');
            return rankings_titles;
        } else {
            throw err;
        }
    }*/

    // console.log("Start read titles")
    // console.log("data = " + data)
    let parsed = JSON.parse(data). record
    // console.log("parsed = " + parsed)

    let guilds = Object.keys(parsed);
    // console.log("guilds = " + guilds)

    for( let i = 0,length = guilds.length; i < length; i++ ) {
        let guild = parsed[ guilds[ i ] ]
        let rankings = Object.keys(guild)
        // console.log("rankings = " + rankings)

        let guildId = guilds[i]
        // console.log("guildId = " + guildId)
        rankings_titles.set(guildId, new Map())
        let rankings_titles_guild = rankings_titles.get(guildId)
        // console.log("rankings_titles_guild = " + rankings_titles_guild)

        for( let j = 0,length = rankings.length; j < length; j++ ) {
            let ranking = guild[ rankings[ j ] ]
            let titles = Object.keys(ranking)
            // console.log("titles = " + titles)

            let rankingName = rankings[j]
            // console.log("rankingName = " + rankingName)
            rankings_titles_guild.set(rankingName, new Map())
            let scores_ranking = rankings_titles_guild.get(rankingName)
            // console.log("scores_ranking = " + scores_ranking)

            for( let k = 0,length = titles.length; k < length; k++ ) {
                let nbpts = ranking[titles[k]]

                let titleId = titles[k]
                // console.log("titleId = " + titleId)

                // console.log("nbpts = " + nbpts)
                scores_ranking.set(titleId, nbpts)

                // // console.log("res : " + res)
            }
        }
    }
    // console.log("END readRankingLinks")
    return rankings_titles
}

module.exports = () => {

    let req = new XMLHttpRequest()

    req.open("GET", process.env.JSONTITLES_URL + "/latest", false);
    req.setRequestHeader("X-Master-Key", process.env.JSONBIN_SECRET_KEY);
    req.send();

    // console.log("req.responseText " + req.responseText)
    return createTitles(req.responseText)
    // return createTitles()

}

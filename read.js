
const data_file = './db/scores_data.json'
const fs = require('fs')
const save = require('./save')
const addPoints = require('./commands/addPoints')

module.exports = (msg) => {

    var scores = new Map()


    try {
        var data = fs.readFileSync(data_file)
    } catch (err) {
        if (err.code === 'ENOENT') {
            console.log('no data: create new');
            return scores;
        } else {
            throw err;
        }
    }
    console.log("data = " + data)
    var parsed = JSON.parse(data)
    console.log("parsed = " + parsed)

    var guilds = Object.keys(parsed);
    console.log("guilds = " + guilds)



    for( var i = 0,length = guilds.length; i < length; i++ ) {
        let guild = parsed[ guilds[ i ] ]
        let rankings = Object.keys(guild)
        console.log("rankings = " + rankings)

        let guildId = guilds[i]
        console.log("guildId = " + guildId)
        scores.set(guildId, new Map())
        let scores_guild = scores.get(guildId)
        console.log("scores_guild = " + scores_guild)

        for( let j = 0,length = rankings.length; j < length; j++ ) {
            let ranking = guild[ rankings[ j ] ]
            let members = Object.keys(ranking)
            console.log("members = " + members)

            let rankingName = rankings[j]
            console.log("rankingName = " + rankingName)
            scores_guild.set(rankingName, new Map())
            let scores_ranking = scores_guild.get(rankingName)
            console.log("scores_ranking = " + scores_ranking)

            for( let k = 0,length = members.length; k < length; k++ ) {
                let score = ranking[members[k]]

                let memberId = members[k]
                console.log("memberId = " + memberId)

                console.log("score = " + score)
                scores_ranking.set(memberId, score)

                // console.log("res : " + res)
            }
        }
    }

    console.log("scores loaded")
    // save(scores)
    return scores
}
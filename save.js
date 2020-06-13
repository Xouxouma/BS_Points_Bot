const fs = require('fs')
const GSON = require('gson')
const data_file = './db/scores_data.json'


function replacer (key, value) {
    if (value instanceof Map) {
        return {
            key: [...value],
        }
    } else return value;
}

function reviver (key, value) {
    if (value._type == "map")
        return new Map(value.map)
    else return value;
}

function rankingScoresToJson(map)
{
    var res = '{\n'
    for (var entry of map.entries()) {
        var key = entry[0],
            value = entry[1];
        res += '\"' + key + '\":' + value +',\n';
    }
    console.log("ranking map length : " + map.size)
    if (map.size > 0)
        res = res.substring(0,res.length-2) + '\n'
    res += '}\n';

    return res
}

function guildScoresToJson(map)
{
    var res = '{\n'
    for (var entry of map.entries()) {
        var key = entry[0],
            value = entry[1];
        res += '\"' + key + '\":' + rankingScoresToJson(value) +',\n';
    }
    res = res.substring(0,res.length-2) + '\n'
    res += '}\n';

    return res
}

function scoresToJson(map)
{
    var res = '{\n'
    for (var entry of map.entries()) {
        var key = entry[0],
            value = entry[1];
        res += '\"' + key + '\":' + guildScoresToJson(value) +',\n';
    }
    res = res.substring(0,res.length-2) + '\n'
    res += '}\n';

    return res
}

module.exports = scores => {
    console.log("save")
    var data = scoresToJson(scores)

    console.log(data)
    fs.writeFile(data_file, data, finished)

    // var scores2 = { name: "John", age: 30, city: "New York" };
/*    var data = JSON.stringify(scores, replacer)
    fs.writeFile(data_file, data, finished)
    console.log("scores" + scores)
    console.log("data json" + data)
    console.log("data gson" + GSON.stringify(scores, replacer))*/

    function finished(err) {
        console.log("All saved.")
    }
}
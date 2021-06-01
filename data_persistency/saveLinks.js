var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const fs = require('fs')
const GSON = require('gson')
const data_file = './db/links_data.json'


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
        for (let i = 0; i < value.length ; i++)
            res += '\"' + key + '\":' + value[i] +',\n';
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
        for (let i = 0; i < value.length ; i++) {
            res += '\"' + key + '\":\"' + value[i] + '\",\n';
        }
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

module.exports = links => {
    console.log("save")
    var data = scoresToJson(links)

    console.log("saveLinks : " + data)

    let req = new XMLHttpRequest()

    req.onreadystatechange = () => {
        if (req.readyState == req.DONE) {
            console.log("PUT finished : " + req.responseText)
        }
    }

    req.open("PUT", process.env.JSONLINKS_URL, true);
    req.setRequestHeader("secret-key", process.env.JSONBIN_SECRET_KEY);
    req.setRequestHeader("Content-Type", "application/json");
    req.setRequestHeader("versioning", false);
    req.send(data);

    // fs.writeFile(data_file, data)

}
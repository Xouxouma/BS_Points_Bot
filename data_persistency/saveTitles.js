var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
fs = require('fs')
var data_file = './db/titles.json'

function titlesToJson(map)
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

function rankings_titles_guildToJson(map)
{
    var res = '{\n'
    for (var entry of map.entries()) {
        var key = entry[0],
            value = entry[1];
        res += '\"' + key + '\":' + titlesToJson(value) +',\n';
    }
    res = res.substring(0,res.length-2) + '\n'
    res += '}\n';

    return res
}

function rankings_titlesToJson(map)
{
    var res = '{\n'
    for (var entry of map.entries()) {
        var key = entry[0],
            value = entry[1];
        res += '\"' + key + '\":' + rankings_titles_guildToJson(value) +',\n';
    }
    res = res.substring(0,res.length-2) + '\n'
    res += '}\n';

    return res
}


module.exports = rankings_titles => {
    console.log("save")
    var data = rankings_titlesToJson(rankings_titles)

    console.log("saveTitles : " + data)

    let req = new XMLHttpRequest()

    req.onreadystatechange = () => {
        if (req.readyState == req.DONE) {
            console.log("PUT finished : " + req.responseText)
        }
    }

    req.open("PUT", process.env.JSONTITLES_URL, true);
    req.setRequestHeader("secret-key", process.env.JSONBIN_SECRET_KEY);
    req.setRequestHeader("Content-Type", "application/json");
    req.setRequestHeader("versioning", false);
    req.send(data);

    // fs.writeFile(data_file, data)

}
var extend = require('util')._extend;

module.exports = (ranking) => {
  let answers = []
  let answer =""
  if (ranking == undefined)
  {
    answers.push("Error! trying to access an undefined ranking cause I'm not well coded.")
    return answers
  }
  if (ranking.size == 0)
  {
    answers.push("No member have points on this ranking yet.")
    return answers
  }
  let sortedRanking = new Map([...ranking.entries()].sort((a, b) => parseFloat(b[1]) - parseFloat(a[1])));
  let rank = 1
  sortedRanking.forEach(function(val,key) {
    let fill_char = (rank >= 10) ? "" : " "
    answer += rank + "° " + fill_char + "- \t" + key + " : "+val+"\n"
    rank += 1
    if (answer.length > 1900)
    {
      answers.push(JSON.parse(JSON.stringify(answer)))
      answer = ""
    }

  })
  answers.push(answer)

  return answers
}

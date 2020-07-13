module.exports = (ranking) => {
  let answer =""
  if (ranking == undefined)
    return "Error! trying to access an undefined ranking cause I'm not well coded."
  if (ranking.size == 0)
    return answer +"No member have points on this ranking yet.\n"
  let sortedRanking = new Map([...ranking.entries()].sort((a, b) => parseFloat(b[1]) - parseFloat(a[1])));
  let rank = 1
  sortedRanking.forEach(function(val,key) {
    let fill_char = (rank >= 10) ? "" : " "
    answer += rank + "° " + fill_char + "- \t" + key + " : "+val+"\n"
    rank += 1
  })

  return answer
}
